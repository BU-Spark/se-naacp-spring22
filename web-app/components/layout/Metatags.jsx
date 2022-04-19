import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const baseUrl = 'https://www.example.com';
export default function Metatags({
  title = 'Home',
  url,
  image = 'https://example.com/images/logos/logo-dark.jpg',
  description = 'This is a description',
  follow = true,
}) {
  const router = useRouter();
  const defaultUrl = `${baseUrl}/${router.pathname}`;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta httpEquiv="content-language" content="en" />
      <title key="title">{`${title} | Topic Modeling`}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content="Topic Modeling" />
      <meta name="author" content="Bosoton University Spark!" />
      <meta name="robots" content={follow ? 'index, follow' : 'noindex, nofollow'} />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      {/* <!-- Open Graph --> */}
      <meta name="og:title" content={`${title} | Topic Modeling`} />
      <meta name="og:description" content={description} key="ogDescription" />
      <meta name="og:image" content={image} key="ogImage" />
      <meta property="og:determiner" content="the" />
      <meta property="og:url" content={url || defaultUrl} key="ogURL" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="Topic Modeling" />
      <meta property="og:type" content="website" />
    </Head>
  );
}
