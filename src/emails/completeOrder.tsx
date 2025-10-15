/* eslint-disable @next/next/no-page-custom-font */
import { useState } from "react";
import { useCart } from "@/app/slt/components/CartProvider";
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
  textAlign: 'right',
  fontFamily: "'Indie Flower', cursive",
}
const subTitle: React.CSSProperties = {
  margin: '10px',
  fontSize: 'x-large',
  color: 'whitesmoke',  
  fontFamily: "'Indie Flower', cursive",
}
const text: React.CSSProperties = {
  padding: '25px',
  color: 'whitesmoke',
  borderRadius: '8px',
  letterSpacing: '.125rem',
  fontFamily: "'M PLUS Rounded 1c'",
  backgroundColor: 'rgba(231, 84, 128)',
}
const img: React.CSSProperties = {
  margin: 'auto',
  width: '160px',
  height: '160px',
  borderRadius: '8px',
}
const logo: React.CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
}

const promo: React.CSSProperties = {
  padding: '25px',
  marginBottom: '0',
  textAlign: 'center',
  borderRadius: "8px",
  backgroundColor: '#ececec',
  fontFamily: "'M PLUS Rounded 1c', arial",
}

const social: React.CSSProperties = {
  margin: '0',
  padding: '25px',
  textAlign: 'center',
  borderRadius: "8px",
  fontFamily: "'M PLUS Rounded 1c'",
  backgroundColor: 'rgba(231, 84, 128)'
}

const imgText: React.CSSProperties = {
  width: '100%',
  padding: '7.5px 0',
  fontWeight: 'bold',
  color: 'whitesmoke',
  textAlign: 'center',
  display: 'inline-block',
  fontFamily: "'Indie Flower', cursive"
}
const Email = () => {
  const { state } = useCart();
  const [cartTotal, setCartTotal] = useState<number>(0)

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet"/>
      </Head>
      <Body style={body}>
        <Section>
          <Row >
            <Column><Img style={logo} src={'https://www.robertamorrison.com/img/slt/logo.jpg'}></Img></Column>
            <Column><Heading style={title}>Your Receipt from Sweet Little Things</Heading></Column>
          </Row>
        </Section>
        <Section>
            <Row >
                <span style={subTitle}>Receipt</span>
            </Row><br/>
            {state.items.map(item => (
              <Row key={item.id}>
                <Column>
                  <Text style={text}>
                    {item.id} - ${item.price} x {item.quantity}
                  </Text>
                </Column>
              </Row>
            ))}        
        </Section>
        <Section>
          <Row style={{width:'5%'}}>
            <Column>
              <Link href="https://www.linkedin.com/in/robert-a-morrison">
                <Img style={{width: '50px', cursor: 'pointer'}} src={'https://img.icons8.com/ios11/200/FFFFFF/linkedin.png'}/>
              </Link>
            </Column>
            <Column>
              <Link href="https://github.com/rob-botics/">
                <Img style={{width: '50px', cursor: 'pointer'}} src={'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png'}/>
              </Link>
            </Column>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};
export default Email