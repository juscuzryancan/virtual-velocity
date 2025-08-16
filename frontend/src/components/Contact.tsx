import Button from 'react-bootstrap/Button';

const Contact = () => {
  return (
    <section className="mb-4 safe" id="contactTop">
      <h2
        style={{ fontWeight: 500 }}
        className="h1-responsive font-weight-bold text-center my-4"
      >
        Contact
      </h2>

      <p className="text-center w-responsive mx-auto mb-5">
        Got questions? Awesome, we got answers.{' '}
      </p>

      <form
        id="contact-form"
        name="contact-form"
        action="mailto:bboysamuel@hotmail.com"
        method="POST"
      >
        <div className="row">
          <div className="col-md-6">
            <div className="md-form mb-0">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
              ></input>
              <label htmlFor="name" className="">
                Your name
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="md-form mb-0">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
              ></input>
              <label htmlFor="email" className="">
                Your email
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="md-form mb-0">
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
              ></input>
              <label htmlFor="subject" className="">
                Subject
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="md-form">
              <textarea
                id="message"
                name="message"
                rows={2}
                className="form-control md-textarea"
              ></textarea>
              <label htmlFor="message">Your message</label>
            </div>
          </div>
        </div>
      </form>

      <div className="text-center text-md-left">
        <Button className="text-white p-2 rounded-sm bg-blue-600">Send</Button>
      </div>
    </section>
  );
};

export default Contact;
