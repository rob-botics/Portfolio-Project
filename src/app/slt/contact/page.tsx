import "@/app/styles/slt.css";
import { PageWrapper } from "@/app/components/PageWrapper"

export const metadata = {
  title: "Sweet Little Things - Contact",
};

const Contact = () => {
    return(
        <PageWrapper>
            <div className="slt-contact-container slt-secondary-bg">
                <p>To Contact Us! Please Call us at <a href="tel:1234567890">(123) 456-7890</a> or Email us at <a href="mailto:sweetlittlethings@gmail.com">sweetlittlethings@gmail.com</a>.</p>
                <p style={{textDecoration: 'underline', fontWeight: 'bold'}}>Hours of Operation:</p>
                <ul>
                    <li>Monday - Thursday: 9am - 5pm</li>
                    <li>Friday: 9am - 3pm</li>
                    <li>Saturday - Sunday: 11am - 7pm</li>
                </ul>
                <p>We are based in <b>Arlington, TX</b> and operate all across the <b>DFW</b> area!</p>
            </div>
        </PageWrapper>
    )
}
export default Contact