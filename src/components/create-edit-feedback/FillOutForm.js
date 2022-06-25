const FeedbackDescription = ({ children, dt, dd }) => {
  return (
    <section>
      <dl>
        <dt>{dt}</dt>
        <dd>{dd}</dd>
      </dl>
      {children}
    </section>
  )
}

export default FeedbackDescription