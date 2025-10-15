/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import "@/app/styles/slt.css";
import { Suspense } from 'react';
import { PageWrapper } from "@/app/components/PageWrapper";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Success(){
    return(
        <PageWrapper>
            <Suspense fallback={<div><FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" /></div>}>
                <Success/>
            </Suspense>
        </PageWrapper>
    )
}