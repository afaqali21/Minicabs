import { useEffect } from "react";
import $ from "jquery"; // Import jQuery

const useClockPicker = (inputRef) => {
  useEffect(() => {
    if (!inputRef.current) return;

    const loadClockPicker = async () => {
      if (typeof window !== "undefined") {
        // Dynamically import ClockPicker
        await import("clockpicker/dist/jquery-clockpicker.min.js");

        // Initialize ClockPicker after importing
        $(inputRef.current).clockpicker({
          autoclose: true,
          placement: "bottom",
          align: "left",
          donetext: "Done",
          afterDone: function () {
            console.log("Time selected!");
          },
        });
      }
    };

    loadClockPicker();

    // Cleanup function to destroy the plugin if the component unmounts
    return () => {
      if (inputRef.current) {
        $(inputRef.current).clockpicker("remove"); // Properly remove the plugin
      }
    };
  }, [inputRef]); // Dependency on inputRef
};

export default useClockPicker;
