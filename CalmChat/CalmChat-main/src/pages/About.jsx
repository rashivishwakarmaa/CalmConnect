export default function About() {
  return (
    <section className="about-page py-4 py-md-5">
      <div className="container">
        <div className="row gy-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <h1 className="mb-4 mb-lg-5">About Us</h1>
            <div className="about-image-wrap">
              <img
                className="img-fluid w-100"
                loading="lazy"
                src="/assets/mental-health.svg"
                alt="Mental wellness"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="ps-lg-4">
              <h2 className="mb-3">CalmConnect: Your Partner in Mental Wellness</h2>
              <p className="lead fs-5 text-secondary mb-3">
                At CalmConnect, we&apos;re dedicated to promoting mental health and well-being. Our mission is to provide accessible and effective tools to help you manage stress, anxiety, and other mental health challenges.
              </p>
              <h3 className="h4 mt-4">Our Vision</h3>
              <p className="mb-4">
                We envision a world where mental health is prioritized, and everyone has the resources to lead fulfilling lives. We strive to break down the stigma surrounding mental health and create a supportive community.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <p className="lead fw-semibold">What We Offer:</p>
            <ul className="list-ul">
              <li>
                <strong>Evidence-Based Tools:</strong> Our app offers a range of evidence-based tools and techniques, including mindfulness meditation, cognitive-behavioral therapy (CBT), and progressive muscle relaxation.
              </li>
              <li>
                <strong>Expert Guidance:</strong> Our team of mental health professionals provides expert advice and support.
              </li>
              <li>
                <strong>Community Support:</strong> Connect with others who understand and can offer support.
              </li>
              <li>
                <strong>Personalized Treatment Plans:</strong> Work with your therapist to create a customized plan to address your specific needs.
              </li>
            </ul>
            <p className="mt-3 fw-medium">Join us on your journey to better mental health.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
