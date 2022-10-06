import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import demo from '.././assets/images/Connection.mp4'


export default function HeroSection(props) {
 
  return (
    <>
      <section className='enterprise_heroSection'>
        <video className='hero_video' autoPlay="autoplay" loop="loop" muted="muted" alt="network_video">
          <source src={demo} type="video/m4v" />
          <source src={demo} type="video/ogg" />
        </video>
        <Container>
          <Row>
            <Col lg={12}>
              <div className='enterprise_herosection_main'>
                <h1>{props.heading}</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}
