import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router';
import Map from '../screens/Map/Map';
import Menu from '../screens/Menu/Menu';

const Navigator = () => (
  <MemoryRouter initialEntries={['/Menu']}>
    <Routes>
      <Route exact path="Menu" element={<Menu />} />
      <Route exact path="Map" element={<Map />} />
    </Routes>
  </MemoryRouter>
);

export default Navigator;
