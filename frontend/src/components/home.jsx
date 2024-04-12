import './home.css';

function Home() {
  return (
    <div>
        <div className="jumbotron">
            <h1 className="display-4">Welcome!</h1>
            <p className="lead">CertCync is the ultimate tool designed to help students effortlessly manage their certifications. Whether you are juggling academic certificates, online course completions, or specialized training, CertCync simplifies the process of tracking and organizing your certifications.</p>
            <hr className="my-4" />
                <p>Start organizing your certifications and enhancing your academic portfolio today with CertCync!
                </p>
                <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>
        </div>
    </div>
  );
}

export default Home;
