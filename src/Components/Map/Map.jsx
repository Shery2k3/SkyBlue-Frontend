import "./Map.css"

const Map = () => {
    return (
      <div className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5774.499590018446!2d-79.638489!3d43.64297100000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b38b822595eef%3A0xc6a638e8c0217d16!2sSkyBlue%20Wholesale%20Ltd.!5e0!3m2!1sen!2sus!4v1723834157832!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  export default Map;
  