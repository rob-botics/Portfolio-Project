/* eslint-disable @next/next/no-page-custom-font */
import { Html, Body, Img, Head, Heading, Row, Section, Text, Column, Link} from "@react-email/components";

const body: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: 'cadetblue'
}
const title: React.CSSProperties = {
  margin: '5px 0 0 0',
  color: 'whitesmoke',
  textAlign: 'right',
  fontSize: 'x-large',
  fontFamily: "'Indie Flower', cursive",
}
const subTitle: React.CSSProperties = {
  margin: '10px',  
  padding: '15px ',
  fontSize: 'large',
  color: 'whitesmoke',
  fontFamily: "'Indie Flower', cursive",
}
const text: React.CSSProperties = {
  padding: '25px',
  fontSize: 'medium',
  textAlign: 'right',
  color: 'whitesmoke',
  letterSpacing: '.125rem',
  fontFamily: "'M PLUS Rounded 1c'",
}
const img: React.CSSProperties = {
  margin: 'auto',
  width: '75px',
  height: '75px',
  borderRadius: '8px',
}
const logo: React.CSSProperties = {
  width: '75px',
  height: '75px',
  borderRadius: '50%',
}

const social: React.CSSProperties = {
  margin: '0',
  padding: '25px',
  textAlign: 'center',
  borderRadius: "8px",
  fontFamily: "'M PLUS Rounded 1c'",
  backgroundColor: 'rgba(231, 84, 128)'
}

const totalSpacing: React.CSSProperties = {
  fontSize: 'medium',
  color: 'whitesmoke',
  padding: '12.5px 25px',
  letterSpacing: '.125rem',
  fontFamily: "'M PLUS Rounded 1c'",
}

type OrderProp = {
  id: string
  price: string
  img: string
  quantity: number
}
const Email = (items: OrderProp[]) => {
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
            {items.map(item => (
              <>
                <Row key={item.id}>
                  <Column>
                    <Img style={img} src={`https://www.robertamorrison.com/${item.img}`}></Img>
                  </Column>
                  <Column>
                    <Text style={text}>
                      {item.id}  
                    </Text>
                  </Column>
                  <Column>
                    <Text style={text}>
                      Price: ${item.price}  
                    </Text>
                  </Column>
                  <Column>
                    <Text style={text}>
                      Quantity: {item.quantity}  
                    </Text>
                  </Column>
                </Row>
                <hr style={{color: 'whitesmoke'}}/>
              </>
            ))}  
            <Row >
              <Text style={totalSpacing}>Total: ${items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
              </Text>
            </Row>      
        </Section>
        <Section style={social}>
          <Row>
            <Column style={social}>
              <Text style={{margin: '0'}}>
                <Link href="www.google.com" style={{color: 'whitesmoke', cursor: 'pointer'}}>
                  www.robertamorrison.com/slt
                  </Link><br/><br/>
              </Text>
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
            </Column>              
          </Row>
        </Section>
      </Body>
    </Html>
  );
};
export default Email