import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import neighborService from '../../services/neighborService';
import NbList from '../secondary/NbList';

export default function Home() {
  const [apiLoading, setApiLoading] = useState(false);
  const [neighbors, setNeighbors] = useState([]);
  const [subneighbors, setSubNeighbors] = useState([]);

  const router = useRouter();
  const { query } = router;

  async function getNeighbors(query) {
    try {
      setApiLoading(true);
      const response = (await neighborService.getNeighbors({ query, limit: 10, page: 1 })).data;
      setNeighbors(response.neighbors);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  }
  useEffect(() => {
    getNeighbors(query.query);
  }, [query.query]);

  const handleChooseNeighbor = async id => {
    try {
      setApiLoading(true);
      const response = (await neighborService.getNeighbor({ query, id: id, limit: 10, page: 1 })).data;
      setNeighbors(response.subneighbors);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8">
      <h3 className="text-2xl text-hint-nav">WGBH Dashboard</h3>


      <label for="fromDate">From:</label>
      <input type="date" id="fromDate" name="fromDate" />
      <label for="toDate">To:</label>
      <input type="date" id="toDate" name="toDate" />
      <input type="submit" />

      <div className="grid grid-cols-1 md:gap-12 lg:gap-4 xl:gap-16 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {neighbors.length > 0 && (
          <>
            {neighbors.map((neighbor) => (
              <NbList
                key={neighbor._id}
                id={neighbor._id}
                nbname={neighbor.nbname}
                onChooseNeighbor={handleChooseNeighbor}
              />
            ))}
          </>
        )}
      </div>

      <ul>
        <li><a href="default.asp">Home</a></li>
        <li><a href="news.asp">News</a></li>
        <li><a href="contact.asp">Contact</a></li>
        <li><a href="about.asp">About</a></li>
      </ul>

    </div>
  );
}
