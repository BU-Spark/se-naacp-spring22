import React from 'react';
import ms from 'ms';
import Uppy from '@uppy/core';
import { StatusBar, DragDrop } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import uploadService from '../../services/uploadService';

export default class DragDropUploader extends React.Component {
  fileInputRef = React.createRef();

  fileRef = React.createRef();

  uppy = new Uppy({
    id: 'drag-drop-id',
    debug: true,
    autoProceed: true, //automatically upload files
    allowMultipleUploads: false,
    restrictions: {
      maxFileSize: 512000, // 500KB in Bytes
      maxNumberOfFiles: 1,
      allowedFileTypes: ['.txt', '.pdf', '.docx'],
    },
  });

  state = {
    uploadError: '',
  };

  componentDidMount() {
    const { uploadType } = this.props;

    if (this.uppy) {
      this.uppy.use(AwsS3, {
        metaFields: ['name'],
        timeout: ms('1 minute'),
        limit: 1,
        getUploadParameters(file) {
          const fileName = file.name;
          const fileExt = fileName.slice(fileName.lastIndexOf('.') + 1);
          return uploadService
            .getSignedUrl({
              // first get an S3 signedUrl from the BE
              fileName: `${uuidv4()}-${fileName.split('.')[0] || Date.now()}`,
              fileType: file.type,
              uploadType: uploadType || 'article', // see upload types on the BE
              fileExt,
            })
            .then(response => {
              // then upload to the signed url
              const { data } = response;
              console.log({ data });
              return {
                method: 'PUT',
                url: data.signedRequestUrl,
                headers: {
                  'content-type': file.type,
                },
              };
            });
        },
        getResponseData(_, xhr) {
          if (!xhr.responseURL) {
            return { location: null };
          }

          return { location: xhr.responseURL.replace(/\?.*$/, '') };
        },
      });

      this.uppy.on('thumbnail:generated', (_, preview) => {
        // replace the thumbnail image with the new image
        if (this.fileRef.current) {
          this.fileRef.current.src = preview;
        }
      });

      this.uppy.on('upload-success', (_, data) => {
        const { updateArticleUrl, setUppyInstance } = this.props;

        updateArticleUrl(data.uploadURL);
        if (setUppyInstance) {
          setUppyInstance(null);
        }
      });

      this.uppy.on('upload-error', (file, error) => {
        const { onError } = this.props;

        this.setState({
          uploadError: 'File upload was not successful, please try again.',
        });
        onError('File upload was not successful, please try again.');
      });
    }
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { articleUrl, errorMessage, defaultImage, id, note, infoText } = this.props;
    const { uploadError } = this.state;

    return (
      <div>
        <div className="row align-self-end h-full">
          <div className="col col-span-2">
            {(articleUrl || defaultImage) && (
              <img ref={this.fileRef} src={articleUrl || defaultImage} className="image img-fluid" alt="Your profile" />
            )}
          </div>
          <div className="col h-full">
            <DragDrop
              id={id}
              width="100%"
              height="100%"
              note={note}
              uppy={this.uppy}
              style={{ height: '100%' }}
              locale={{
                strings: {
                  dropHereOr: 'Upload an article or %{browse}',
                  browse: 'select a file',
                },
              }}
            />
          </div>
        </div>
        <div className="mb-2 info-error">
          {/* {!uploadError && !errorMessage && <small className="text-gray-200">{infoText}</small>} */}
          {(uploadError || errorMessage) && <small className="text-red-600">{uploadError || errorMessage}</small>}
        </div>
        <StatusBar
          uppy={this.uppy}
          hideAfterFinish
          hideUploadButton
          hideCancelButton
          hideRetryButton
          hidePauseResumeButton
          showProgressDetails
        />
      </div>
    );
  }
}
