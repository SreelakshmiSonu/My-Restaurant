function Slideshow() {
    return (
      <div className="slideshow">
        <div
          className="slide"
          style={{ backgroundImage: "url('/images/rice.JPG')" }}
        ></div>
        <div
          className="slide"
          style={{ backgroundImage: "url('/images/egg.JPG')" }}
        ></div>
        {/* <div
          className="slide"
          style={{ backgroundImage: "url('/images/slide3.jpg')" }}
        ></div> */}
      </div>
    );
  }

  export default Slideshow;
  