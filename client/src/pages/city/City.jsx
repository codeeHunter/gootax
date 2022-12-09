import React, { useState } from "react";
import { Modal } from "../../components/modal/Modal";
import { useGetCity } from "../../hooks/useGetCity";

export const City = () => {
  const [show, setShow] = useState(true);
  const city = useGetCity();

  return (
    <div>
      {city ? (
        <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
          <p>Ваш город {city}?</p>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};
