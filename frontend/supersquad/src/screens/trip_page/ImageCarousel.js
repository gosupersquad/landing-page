import React, { useState } from "react";
import "./ImageCarousel.css";
import SideCircle from "../../resources/images/trip_page/circle-next.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import { ReactComponent as Cross1 } from "../../resources/images/trip_page/cross.svg";

const ImageCarousel = ({ images, style, width, className, hideArrows }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(0);
  };
  const goToPrevious = () => {
    setCurrentIndex((currentIndex === 0 ? images.length : currentIndex) - 1);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  const checkFileType = (url) => {
    const imageExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
      "avif",
    ];
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];

    const extension = url.split(".").pop().toLowerCase();

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown";
    }
  };

  const modal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            padding: isMobile ? 12 : 24,
            width: isMobile ? "90vw" : "75vw",
            boxSizing: "border-box",
            maxHeight: "90vh",
            margin: "auto",
            border: "none",
            outline: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
            borderRadius: 16,
            background: "var(--background-color-modal)",
          }}
        >
          <Cross1
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: isMobile ? 4 : 8,
              right: isMobile ? 4 : 8,
            }}
            className="share_icon"
            alt="Cross"
          />
          {images.length > 1 && (
            <>
              <img
                alt="next"
                src={SideCircle}
                onClick={goToNext}
                style={{
                  position: "absolute",
                  top: isMobile ? "27vw" : "20vw",
                  right: isMobile ? 15 : 30,
                  cursor: "pointer",
                  opacity: 1,
                  width: width ? width : 43,
                  zIndex: 2,
                }}
              />
              <img
                alt="previous"
                src={SideCircle}
                onClick={goToPrevious}
                style={{
                  position: "absolute",
                  top: isMobile ? "27vw" : "20vw",
                  left: isMobile ? 15 : 30,
                  cursor: "pointer",
                  WebkitTransform: "rotate(180deg)",
                  transform: "rotate(180deg)",
                  width: width ? width : 43,
                  zIndex: 2,
                }}
              />
            </>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              {checkFileType(images[currentIndex]) == "image" && (
                <img
                  src={images[currentIndex].replace(
                    "http://localhost:5005",
                    "https://gosupersquad.com:5005"
                  )}
                  alt={`Slide ${currentIndex}`}
                  // style={
                  //   style
                  //     ? style
                  //     : {
                  //         width: "100%",
                  //         borderRadius: 24,
                  //         objectFit: "cover",
                  //         height: isMobile ? "223px" : "",
                  //         aspectRatio: isMobile ? "" : 2 / 1,
                  //       }
                  // }
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    objectFit: "cover",
                    height: isMobile ? "223px" : "",
                    aspectRatio: isMobile ? "" : 2 / 1,
                  }}
                />
              )}
              {images.length > 1 && (
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    gap: isMobile ? 8 : 16,
                    overflow: "auto",
                  }}
                >
                  {images.map((i, index) => (
                    <img
                      style={{
                        minWidth: 60,
                        width: 60,
                        minHeight: 60,
                        height: 60,
                        borderRadius: 12,
                        margin: 4,
                        boxSizing: "border-box",
                        border: "1px solid #fff",
                        outline:
                          currentIndex == index &&
                          "rgb(91, 186, 255) solid 3px",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      src={i.replace(
                        "http://localhost:5005",
                        "https://gosupersquad.com:5005"
                      )}
                      onClick={() => setCurrentIndex(index)}
                      alt="Images"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "var(--background-color-modal)",
      }}
    >
      {images.length > 1 && !hideArrows && (
        <>
          <img
            src={SideCircle}
            onClick={goToNext}
            style={{
              position: "absolute",
              top: "44%",
              right: 4,
              cursor: "pointer",
              opacity: 1,
              width: width ? width : 20,
              zIndex: 2,
            }}
            alt="Next"
          />
          <img
            src={SideCircle}
            onClick={goToPrevious}
            style={{
              position: "absolute",
              top: "44%",
              left: 4,
              cursor: "pointer",
              WebkitTransform: "rotate(180deg)",
              transform: "rotate(180deg)",
              width: width ? width : 20,
              zIndex: 2,
            }}
            alt="Previous"
          />
        </>
      )}
      {modal()}
      <div>
        {checkFileType(images[currentIndex]) == "image" && (
          <img
            src={images[currentIndex].replace(
              "http://localhost:5005",
              "https://gosupersquad.com:5005"
            )}
            alt={`Slide ${currentIndex}`}
            style={
              className
                ? {}
                : style
                ? style
                : {
                    width: "100%",
                    height: isMobile ? 223 : "calc((83.34vw - 510px)/2)",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    objectFit: "cover",
                    cursor: "pointer",
                  }
            }
            onClick={handleOpen}
            className={className}
          />
        )}
        {checkFileType(images[currentIndex]) == "video" && (
          <video
            autoPlay
            loop
            muted
            style={
              style
                ? style
                : {
                    width: "100%",
                    height: isMobile ? 223 : "calc((83.34vw - 510px)/2)",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    objectFit: "cover",
                  }
            }
          >
            <source
              src={images[currentIndex].replace(
                "http://localhost:5005",
                "https://gosupersquad.com:5005"
              )}
              type={`video/${images[currentIndex].split(".").pop()}`}
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
