import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { getData } from "../../util/api";
import { useGlobal } from "../context/context";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useState } from "react";

function BookingModal({ opened, setOpened, email, propertyId }) {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token},
    setUserDetails,
  } = useGlobal();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, date: dayjs(value).format("DD/MM/YYYY") }),
  };

  const handleBookingSuccess = function () {
    toast.success("You have successfully booked this place");
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        { residency: propertyId, date: dayjs(value).format("DD/MM/YYYY") },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => getData(`user/book/${propertyId}`, options),
    onSuccess: handleBookingSuccess,
    onError: (err) => console.log(err),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
}
export default BookingModal;
