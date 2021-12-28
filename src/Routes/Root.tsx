import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Account } from './Account';
import { Home, Chat } from 'Pages';
import { PrivateRoute } from 'Components';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/chat" element={<PrivateRoute />}>
          <Route path="" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
