/* eslint-disable @next/next/no-page-custom-font */
import { Html, Body, Img, Head, Heading, Row, Section, Text, Column, Link} from "@react-email/components";

type WelcomeEmailProps = {
    firstName: string
    email: string
}

const body: React.CSSProperties = {
  background: 'cadetblue'
}
const title: React.CSSProperties = {
  margin: '5px 0 0 0',
  color: 'whitesmoke',
  fontFamily: "'Indie Flower', cursive",
}
const subTitle: React.CSSProperties = {
  margin: '0',
  fontSize: 'x-large',
  color: 'whitesmoke',  
  fontFamily: "'Indie Flower', cursive",
}
const text: React.CSSProperties = {
  padding: '25px',
  color: 'whitesmoke',
  borderRadius: '8px',
  fontFamily: "'M PLUS Rounded 1c'",
  backgroundColor: 'rgba(231, 84, 128)',
}
const img: React.CSSProperties = {
  margin: 'auto',
  width: '250px',
  height: '250px',
  borderRadius: '8px',
}

const promo: React.CSSProperties = {
  padding: '25px',
  marginBottom: '0',
  textAlign: 'center',
  borderRadius: "8px",
  backgroundColor: '#ececec',
  fontFamily: "'M PLUS Rounded 1c'",
}

const social: React.CSSProperties = {
  margin: '0',
  padding: '25px',
  textAlign: 'center',
  borderRadius: "8px",
  fontFamily: "'M PLUS Rounded 1c'",
  backgroundColor: 'rgba(231, 84, 128)'
}

const Email = ({firstName}: WelcomeEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet"/>
        <style>
          {`
            .img-text{
              width: 100%;
              padding: 7.5px 0;
              font-weight: bold;
              color: whitesmoke;
              text-align: center;
              display: inline-block;
              font-family: 'Indie Flower', cursive
            }
            @media only screen and (max-width: 450px) {
              .img {
                max-width: 160px;
                max-height: 160px;
              }
            }
          `}
        </style>
      </Head>
      <Body style={body}>
        <Heading style={title}>Welcome {firstName} To Sweet Little Things Newletters! </Heading>
        <Text style={subTitle}>Where little  thing are always sweet! 🧁🍰</Text>
        <Text style={text}>We’re so happy to have you! You’ve officially joined the Sweet Little Things family
          — a cozy corner of the world where handmade pastries and lovingly baked 
          treats brighten every day. As a subscriber, you’ll be the first to hear about seasonal specials,
          exclusive discounts, and behind-the-oven stories from our kitchen to yours.
        </Text>
        <Section>
            <Row >
              <Column>
                <span className="img-text">Cheesecakes</span>
                <Link href="#">
                  <Img className="img" style={img} src={'https://images.squarespace-cdn.com/content/v1/5255aaa1e4b00705c7fcccd8/1616081972864-PXBQOJRN1ZI9A4DYKFG1/Mini+Cheese+cakes.jpg'}/>
                </Link>
              </Column>
              <Column>
                <span className="img-text">Cakes</span>
                <Link href="#">
                  <Img className="img" style={img} src={'https://i.pinimg.com/736x/c7/3b/c8/c73bc804b5f3f99cfb96d93374391929.jpg'}/>
                </Link>
              </Column>
            </Row><br/>
            <Row >
              <Column>
                <span className="img-text">Cupcakes</span>
                <Link href="#">
                  <Img className="img" style={img} src={'https://www.glorioustreats.com/wp-content/uploads/2024/05/smore-cupcakes-square.jpeg'}/>
                </Link>
              </Column>
              <Column>
                <span className="img-text">Jellos</span>
                <Link href="#">
                  <Img className="img" style={img} src={'https://amandascookin.com/wp-content/uploads/2021/12/Broken-Glass-Jello-RC-SQ.jpg'}/>
                </Link>
              </Column>
            </Row>
            <Row>
              <Text style={promo}>USE THIS PROMO CODE FOR 20% OFF <br/><br/> <span style={{border: '2px solid', padding: '12.5px 25px', borderRadius: '8px'}}>SLT20</span></Text>
              <Column style={social}>
                <Text style={{margin: '0'}}>
                  <Link href="www.google.com" style={{color: 'whitesmoke', cursor: 'pointer'}}>
                    www.robertamorrison.com/slt
                    </Link><br/><br/>
                </Text>
                <Row style={{width:'5%'}}>
                  <Column>
                    <Link href="https://www.linkedin.com/in/robert-a-morrison">
                      <Img style={{width: '35px', cursor: 'pointer'}} src={'https://img.icons8.com/ios11/200/FFFFFF/linkedin.png'}/>
                    </Link>
                  </Column>
                  <Column>
                    <Link href="https://github.com/rob-botics/">
                      <Img style={{width: '35px', cursor: 'pointer'}} src={'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png'}/>
                    </Link>
                  </Column>
                </Row>
              </Column>
              
            </Row>
        </Section>
      </Body>
    </Html>
  );
};
export default Email