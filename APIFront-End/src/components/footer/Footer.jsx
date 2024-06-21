const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="row p-5 pb-2 bg-dark text-white">
        <div className="col-xs-12  col-md-6 col-lg-3">
          <p className="h3">DiscoManiacos</p>
          <p className="text-secondary">Rosario, Santa Fe, Argentina</p>
          <img></img>
        </div>
        <div className="col-xs-12  col-md-6 col-lg-3">
          <p className="h5 mb-3">Developers</p>
          <a className="text-secondary text-decoration-none" href="#">
            Ledesma & Porcari development
          </a>
        </div>
        <div className="col-xs-12  col-md-6 col-lg-3">
          <p className="h5 mb-3">Politicas</p>
          <div className="mb-2">
            <a className="text-secondary text-decoration-none" href="#">
              Terminos y condiciones
            </a>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="#">
                Politicas y privacidad
              </a>
            </div>
          </div>
        </div>
        <div className="col-xs-12  col-md-6 col-lg-3">
          <p className="h5 mb-3">Contacto</p>
          <div className="mb-2">
            <a className="text-secondary text-decoration-none" href="#">
              Instagram
            </a>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="#">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="col-xs-12 pt-4">
          <p className="text-white text-center">
            Copyright - All rights reserverd © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
