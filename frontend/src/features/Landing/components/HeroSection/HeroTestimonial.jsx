export default function HeroTestimonial() {
  return (
    <section className="hero-testimonial-wrapper">
      {/* Quote riêng trên cùng */}
      <div className="section-testimonial-quote-icon">
        <img
          src="/images/right.png"
          alt="Quote Icon"
          className="section-testimonial-quote-image"
        />
      </div>

      {/* Phần text và meta nằm ngang */}
      <div className="section-testimonial">
        <div className="section-testimonial-text">
          <p className="section-testimonial-content">
            Exploration is in our nature. We began as wanderers, and we are
            wanderers still. We have lingered long enough on the shores of the
            cosmic ocean. We are ready at last to set sail for the stars.
          </p>
        </div>

        <div className="section-testimonial-meta">
          <div className="section-testimonial-company">Solar System Explorer</div>
          <div className="section-testimonial-person">
            <img
              src="/images/carlsagan.jpg"
              alt="Carl Sagan"
              className="section-testimonial-avatar"
            />
            <div className="section-testimonial-person-info">
              <div className="section-testimonial-author">Carl Sagan (1934–1996)</div>
              <span className="section-testimonial-desc">
                <p>astronomer, author, and</p>
                <p>science communicator.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
