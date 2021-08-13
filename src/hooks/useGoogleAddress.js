import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const useGoogleAddress = address => {
  const [map, setMap] = useState({});

  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.google_map_api_key}`

  useEffect(async() => {
    const response = await axios.get(API);
    setMap(response.data.results[0].geometry.location);
  }, []);
  return map;
}

export default useGoogleAddress;