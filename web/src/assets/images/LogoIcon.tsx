import * as React from 'react';

interface LogoIconProps {
    className?: string;
    styles?: any;
}

export const LogoIcon: React.FC<LogoIconProps> = (props: LogoIconProps) => (
    <svg className={props.className} style={props.styles} width="125" height="41" viewBox="0 0 125 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.3441 27.6704H61.3462L55.3352 18.5749V27.6704H53.3373V15.473H55.3352L61.3462 24.551V15.473H63.3441V27.6704ZM66.1779 22.7985C66.1779 21.8288 66.3765 20.97 66.7738 20.2223C67.1827 19.4746 67.7318 18.8962 68.4211 18.4873C69.1221 18.0667 69.8932 17.8564 70.7344 17.8564C71.4938 17.8564 72.1539 18.0083 72.7147 18.3121C73.2872 18.6042 73.7429 18.9722 74.0817 19.4161V18.0141H76.0971V27.6704H74.0817V26.2334C73.7429 26.689 73.2814 27.0687 72.6972 27.3725C72.1131 27.6763 71.4471 27.8281 70.6994 27.8281C69.8699 27.8281 69.1104 27.6178 68.4211 27.1972C67.7318 26.765 67.1827 26.1691 66.7738 25.4097C66.3765 24.6386 66.1779 23.7682 66.1779 22.7985ZM74.0817 22.8335C74.0817 22.1676 73.9415 21.5892 73.6611 21.0985C73.3924 20.6078 73.036 20.234 72.5921 19.9769C72.1481 19.7199 71.6691 19.5914 71.155 19.5914C70.641 19.5914 70.1619 19.7199 69.718 19.9769C69.274 20.2223 68.9118 20.5903 68.6314 21.081C68.3627 21.56 68.2283 22.1325 68.2283 22.7985C68.2283 23.4644 68.3627 24.0486 68.6314 24.551C68.9118 25.0533 69.274 25.4389 69.718 25.7076C70.1736 25.9646 70.6526 26.0932 71.155 26.0932C71.6691 26.0932 72.1481 25.9646 72.5921 25.7076C73.036 25.4506 73.3924 25.0767 73.6611 24.586C73.9415 24.0836 74.0817 23.4995 74.0817 22.8335ZM80.6139 16.7348C80.2517 16.7348 79.9479 16.6122 79.7026 16.3668C79.4572 16.1215 79.3345 15.8177 79.3345 15.4555C79.3345 15.0933 79.4572 14.7896 79.7026 14.5442C79.9479 14.2989 80.2517 14.1762 80.6139 14.1762C80.9644 14.1762 81.2623 14.2989 81.5076 14.5442C81.753 14.7896 81.8756 15.0933 81.8756 15.4555C81.8756 15.8177 81.753 16.1215 81.5076 16.3668C81.2623 16.6122 80.9644 16.7348 80.6139 16.7348ZM81.5952 18.0141V27.6704H79.5974V18.0141H81.5952ZM87.0923 19.4161C87.3844 18.9254 87.77 18.5457 88.249 18.277C88.7397 17.9966 89.318 17.8564 89.984 17.8564V19.9244H89.4757C88.693 19.9244 88.0971 20.123 87.6882 20.5202C87.291 20.9175 87.0923 21.6068 87.0923 22.5882V27.6704H85.0945V18.0141H87.0923V19.4161ZM92.0307 22.7985C92.0307 21.8288 92.2293 20.97 92.6265 20.2223C93.0355 19.4746 93.5846 18.8962 94.2739 18.4873C94.9749 18.0667 95.746 17.8564 96.5872 17.8564C97.3466 17.8564 98.0067 18.0083 98.5675 18.3121C99.14 18.6042 99.5956 18.9722 99.9345 19.4161V18.0141H101.95V27.6704H99.9345V26.2334C99.5956 26.689 99.1341 27.0687 98.55 27.3725C97.9658 27.6763 97.2999 27.8281 96.5521 27.8281C95.7226 27.8281 94.9632 27.6178 94.2739 27.1972C93.5846 26.765 93.0355 26.1691 92.6265 25.4097C92.2293 24.6386 92.0307 23.7682 92.0307 22.7985ZM99.9345 22.8335C99.9345 22.1676 99.7943 21.5892 99.5139 21.0985C99.2451 20.6078 98.8888 20.234 98.4448 19.9769C98.0009 19.7199 97.5218 19.5914 97.0078 19.5914C96.4937 19.5914 96.0147 19.7199 95.5707 19.9769C95.1268 20.2223 94.7646 20.5903 94.4842 21.081C94.2155 21.56 94.0811 22.1325 94.0811 22.7985C94.0811 23.4644 94.2155 24.0486 94.4842 24.551C94.7646 25.0533 95.1268 25.4389 95.5707 25.7076C96.0264 25.9646 96.5054 26.0932 97.0078 26.0932C97.5218 26.0932 98.0009 25.9646 98.4448 25.7076C98.8888 25.4506 99.2451 25.0767 99.5139 24.586C99.7943 24.0836 99.9345 23.4995 99.9345 22.8335ZM114.3 22.6057C114.3 22.9679 114.277 23.295 114.23 23.5871H106.852C106.911 24.3582 107.197 24.9774 107.711 25.4447C108.225 25.9121 108.856 26.1457 109.604 26.1457C110.678 26.1457 111.438 25.6959 111.882 24.7963H114.037C113.745 25.6842 113.214 26.4145 112.443 26.9869C111.683 27.5477 110.737 27.8281 109.604 27.8281C108.681 27.8281 107.851 27.6237 107.115 27.2148C106.391 26.7942 105.818 26.21 105.398 25.4623C104.989 24.7028 104.784 23.8266 104.784 22.8335C104.784 21.8404 104.983 20.97 105.38 20.2223C105.789 19.4629 106.356 18.8787 107.08 18.4698C107.816 18.0609 108.657 17.8564 109.604 17.8564C110.515 17.8564 111.327 18.055 112.04 18.4523C112.752 18.8495 113.307 19.4103 113.704 20.1347C114.102 20.8474 114.3 21.671 114.3 22.6057ZM112.215 21.9748C112.203 21.2387 111.94 20.6487 111.426 20.2048C110.912 19.7608 110.275 19.5388 109.516 19.5388C108.827 19.5388 108.237 19.7608 107.746 20.2048C107.255 20.6371 106.963 21.2271 106.87 21.9748H112.215ZM121.279 22.7809L124.398 27.6704H122.137L120.052 24.3932L118.089 27.6704H116.003L119.123 22.9211L116.003 18.0141H118.264L120.35 21.2913L122.312 18.0141H124.398L121.279 22.7809Z" fill="var(--primary-text-color)"/>
        <circle cx="20.2312" cy="20.2312" r="19.5087" fill="#FFC36D" stroke="#FFC36D" strokeWidth="1.44509"/>
        <mask id="path-3-outside-1" maskUnits="userSpaceOnUse" x="8.39307" y="5.50293" width="24" height="29" fill="black">
        <rect fill="white" x="8.39307" y="5.50293" width="24" height="29"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.2021 21.0382C9.98773 21.0382 9.78212 20.953 9.63041 20.8015C9.4787 20.65 9.39333 20.4445 9.39307 20.2301C9.39417 17.6003 10.3286 15.0562 12.0298 13.0509C13.7311 11.0455 16.0888 9.70897 18.6833 9.27925L17.3186 7.91449C17.2363 7.84118 17.1698 7.75183 17.1233 7.65193C17.0768 7.55203 17.0513 7.44365 17.0482 7.33345C17.0451 7.22332 17.0646 7.11371 17.1055 7.01133C17.1463 6.90895 17.2077 6.81608 17.2859 6.73834C17.3639 6.66056 17.4571 6.59961 17.5597 6.5592C17.6622 6.51879 17.772 6.49979 17.8821 6.50335C17.9922 6.50692 18.1005 6.53298 18.2002 6.57993C18.2999 6.62688 18.389 6.69373 18.4619 6.77639L21.0609 9.37544C21.1724 9.48863 21.2481 9.63227 21.2784 9.78821C21.3088 9.94423 21.2924 10.1056 21.2315 10.2524C21.1705 10.3992 21.0676 10.5247 20.9357 10.6132C20.8038 10.7019 20.6487 10.7496 20.4898 10.7505C17.9765 10.7532 15.5669 11.7528 13.7898 13.53C12.0126 15.3072 11.013 17.7168 11.0102 20.2301C11.0102 20.4444 10.9251 20.6499 10.7735 20.8015C10.622 20.953 10.4165 21.0382 10.2021 21.0382ZM18.3377 19.0452V23.8201C18.3385 23.9417 18.3145 24.062 18.2673 24.174C18.2224 24.2813 18.1555 24.3779 18.0707 24.4575C17.986 24.5376 17.8876 24.6018 17.78 24.6469C17.553 24.7403 17.2982 24.7403 17.0713 24.6469C16.9639 24.6015 16.8654 24.5375 16.7805 24.4575C16.6962 24.3775 16.6293 24.281 16.5839 24.174C16.5371 24.062 16.5135 23.9416 16.5146 23.8201V16.6686C16.5137 16.5569 16.5337 16.446 16.5736 16.3416C16.6126 16.243 16.6687 16.1519 16.7391 16.0726C16.8142 15.9736 16.9099 15.8921 17.0195 15.8336C17.1452 15.7694 17.2851 15.7382 17.4261 15.7425C17.5608 15.7422 17.6937 15.7723 17.8152 15.8305C17.9426 15.8918 18.056 15.9788 18.1483 16.086L22.6418 21.3442V16.6396C22.6409 16.5176 22.6663 16.397 22.7163 16.2858C22.7631 16.1787 22.831 16.0823 22.9161 16.0022C23.0015 15.9216 23.1012 15.8574 23.2099 15.8129C23.3234 15.7661 23.4451 15.7421 23.5679 15.7425C23.8066 15.7415 24.0361 15.8348 24.2063 16.0022C24.2865 16.0841 24.3507 16.1803 24.3956 16.2858C24.4424 16.3978 24.466 16.5182 24.4649 16.6396V23.8201C24.4662 23.9548 24.4365 24.0879 24.3781 24.2092C24.3197 24.3269 24.2372 24.4309 24.1359 24.5144C24.0689 24.5802 23.9889 24.6313 23.901 24.6645C23.8017 24.7009 23.6965 24.7188 23.5906 24.7172H23.4789C23.3654 24.7098 23.2555 24.6742 23.1592 24.6138C23.0597 24.5466 22.9732 24.4622 22.9036 24.3644L18.3377 19.0452ZM22.7797 33.864C22.8777 33.9047 22.9828 33.9256 23.089 33.9254C23.2488 33.9252 23.405 33.8777 23.5379 33.7888C23.6707 33.7 23.7743 33.5738 23.8354 33.4262C23.8967 33.2785 23.9128 33.116 23.8818 32.9592C23.8508 32.8025 23.774 32.6584 23.6612 32.5452L22.2964 31.1805C24.8908 30.7507 27.2486 29.4142 28.9499 27.4088C30.6511 25.4034 31.5855 22.8594 31.5867 20.2296C31.5792 20.0201 31.4907 19.8218 31.3399 19.6762C31.1891 19.5307 30.9877 19.4494 30.7781 19.4494C30.5685 19.4494 30.3671 19.5307 30.2163 19.6762C30.0655 19.8218 29.977 20.0201 29.9695 20.2296C29.9667 22.7429 28.9671 25.1525 27.19 26.9296C25.4128 28.7068 23.0032 29.7064 20.4899 29.7092C20.33 29.709 20.1736 29.7564 20.0406 29.8453C19.9076 29.9341 19.8039 30.0605 19.7427 30.2083C19.6816 30.3561 19.6657 30.5187 19.697 30.6756C19.7283 30.8324 19.8055 30.9764 19.9188 31.0894L22.5179 33.6885C22.5927 33.7637 22.6817 33.8234 22.7797 33.864Z"/>
        </mask>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.2021 21.0382C9.98773 21.0382 9.78212 20.953 9.63041 20.8015C9.4787 20.65 9.39333 20.4445 9.39307 20.2301C9.39417 17.6003 10.3286 15.0562 12.0298 13.0509C13.7311 11.0455 16.0888 9.70897 18.6833 9.27925L17.3186 7.91449C17.2363 7.84118 17.1698 7.75183 17.1233 7.65193C17.0768 7.55203 17.0513 7.44365 17.0482 7.33345C17.0451 7.22332 17.0646 7.11371 17.1055 7.01133C17.1463 6.90895 17.2077 6.81608 17.2859 6.73834C17.3639 6.66056 17.4571 6.59961 17.5597 6.5592C17.6622 6.51879 17.772 6.49979 17.8821 6.50335C17.9922 6.50692 18.1005 6.53298 18.2002 6.57993C18.2999 6.62688 18.389 6.69373 18.4619 6.77639L21.0609 9.37544C21.1724 9.48863 21.2481 9.63227 21.2784 9.78821C21.3088 9.94423 21.2924 10.1056 21.2315 10.2524C21.1705 10.3992 21.0676 10.5247 20.9357 10.6132C20.8038 10.7019 20.6487 10.7496 20.4898 10.7505C17.9765 10.7532 15.5669 11.7528 13.7898 13.53C12.0126 15.3072 11.013 17.7168 11.0102 20.2301C11.0102 20.4444 10.9251 20.6499 10.7735 20.8015C10.622 20.953 10.4165 21.0382 10.2021 21.0382ZM18.3377 19.0452V23.8201C18.3385 23.9417 18.3145 24.062 18.2673 24.174C18.2224 24.2813 18.1555 24.3779 18.0707 24.4575C17.986 24.5376 17.8876 24.6018 17.78 24.6469C17.553 24.7403 17.2982 24.7403 17.0713 24.6469C16.9639 24.6015 16.8654 24.5375 16.7805 24.4575C16.6962 24.3775 16.6293 24.281 16.5839 24.174C16.5371 24.062 16.5135 23.9416 16.5146 23.8201V16.6686C16.5137 16.5569 16.5337 16.446 16.5736 16.3416C16.6126 16.243 16.6687 16.1519 16.7391 16.0726C16.8142 15.9736 16.9099 15.8921 17.0195 15.8336C17.1452 15.7694 17.2851 15.7382 17.4261 15.7425C17.5608 15.7422 17.6937 15.7723 17.8152 15.8305C17.9426 15.8918 18.056 15.9788 18.1483 16.086L22.6418 21.3442V16.6396C22.6409 16.5176 22.6663 16.397 22.7163 16.2858C22.7631 16.1787 22.831 16.0823 22.9161 16.0022C23.0015 15.9216 23.1012 15.8574 23.2099 15.8129C23.3234 15.7661 23.4451 15.7421 23.5679 15.7425C23.8066 15.7415 24.0361 15.8348 24.2063 16.0022C24.2865 16.0841 24.3507 16.1803 24.3956 16.2858C24.4424 16.3978 24.466 16.5182 24.4649 16.6396V23.8201C24.4662 23.9548 24.4365 24.0879 24.3781 24.2092C24.3197 24.3269 24.2372 24.4309 24.1359 24.5144C24.0689 24.5802 23.9889 24.6313 23.901 24.6645C23.8017 24.7009 23.6965 24.7188 23.5906 24.7172H23.4789C23.3654 24.7098 23.2555 24.6742 23.1592 24.6138C23.0597 24.5466 22.9732 24.4622 22.9036 24.3644L18.3377 19.0452ZM22.7797 33.864C22.8777 33.9047 22.9828 33.9256 23.089 33.9254C23.2488 33.9252 23.405 33.8777 23.5379 33.7888C23.6707 33.7 23.7743 33.5738 23.8354 33.4262C23.8967 33.2785 23.9128 33.116 23.8818 32.9592C23.8508 32.8025 23.774 32.6584 23.6612 32.5452L22.2964 31.1805C24.8908 30.7507 27.2486 29.4142 28.9499 27.4088C30.6511 25.4034 31.5855 22.8594 31.5867 20.2296C31.5792 20.0201 31.4907 19.8218 31.3399 19.6762C31.1891 19.5307 30.9877 19.4494 30.7781 19.4494C30.5685 19.4494 30.3671 19.5307 30.2163 19.6762C30.0655 19.8218 29.977 20.0201 29.9695 20.2296C29.9667 22.7429 28.9671 25.1525 27.19 26.9296C25.4128 28.7068 23.0032 29.7064 20.4899 29.7092C20.33 29.709 20.1736 29.7564 20.0406 29.8453C19.9076 29.9341 19.8039 30.0605 19.7427 30.2083C19.6816 30.3561 19.6657 30.5187 19.697 30.6756C19.7283 30.8324 19.8055 30.9764 19.9188 31.0894L22.5179 33.6885C22.5927 33.7637 22.6817 33.8234 22.7797 33.864Z" fill="#171926"/>
        <path d="M9.63041 20.8015L9.83677 20.5949L9.83677 20.5949L9.63041 20.8015ZM9.39307 20.2301L9.10104 20.2299L9.10104 20.2304L9.39307 20.2301ZM18.6833 9.27925L18.731 9.56735L19.2915 9.47451L18.8898 9.07276L18.6833 9.27925ZM17.3186 7.91449L17.5251 7.70801L17.5191 7.70204L17.5128 7.69643L17.3186 7.91449ZM17.1233 7.65193L17.3881 7.52878L17.388 7.52864L17.1233 7.65193ZM17.0482 7.33345L17.3401 7.32534L17.3401 7.32534L17.0482 7.33345ZM17.1055 7.01133L17.3767 7.11957V7.11957L17.1055 7.01133ZM17.2859 6.73834L17.4918 6.94534L17.492 6.94522L17.2859 6.73834ZM17.5597 6.5592L17.6667 6.83091L17.6668 6.83088L17.5597 6.5592ZM17.8821 6.50335L17.8915 6.21148L17.8821 6.50335ZM18.2002 6.57993L18.3246 6.31573L18.3246 6.31572L18.2002 6.57993ZM18.4619 6.77639L18.2429 6.96958L18.2489 6.97643L18.2554 6.98289L18.4619 6.77639ZM21.0609 9.37544L21.269 9.1705L21.2674 9.16895L21.0609 9.37544ZM21.2784 9.78821L20.9917 9.84392L20.9918 9.84401L21.2784 9.78821ZM21.2315 10.2524L21.5011 10.3645L21.5012 10.3644L21.2315 10.2524ZM20.9357 10.6132L20.773 10.3708L20.7729 10.3708L20.9357 10.6132ZM20.4898 10.7505L20.4901 11.0425L20.4915 11.0425L20.4898 10.7505ZM13.7898 13.53L13.9963 13.7365L13.9963 13.7365L13.7898 13.53ZM11.0102 20.2301L10.7182 20.2297V20.2301H11.0102ZM10.7735 20.8015L10.5671 20.5949L10.567 20.595L10.7735 20.8015ZM18.3377 23.8201H18.0456L18.0457 23.822L18.3377 23.8201ZM18.3377 19.0452L18.5593 18.855L18.0457 18.2567V19.0452H18.3377ZM18.2673 24.174L17.9982 24.0605L17.9979 24.0613L18.2673 24.174ZM18.0707 24.4575L17.8707 24.2447L17.87 24.2454L18.0707 24.4575ZM17.78 24.6469L17.8911 24.9169L17.8929 24.9162L17.78 24.6469ZM17.0713 24.6469L16.9576 24.9159L16.9602 24.9169L17.0713 24.6469ZM16.7805 24.4575L16.5795 24.6694L16.5803 24.6701L16.7805 24.4575ZM16.5839 24.174L16.3145 24.2867L16.3151 24.288L16.5839 24.174ZM16.5146 23.8201L16.8066 23.8228V23.8201H16.5146ZM16.5146 16.6686H16.8066L16.8066 16.6662L16.5146 16.6686ZM16.5736 16.3416L16.302 16.2342L16.3008 16.2374L16.5736 16.3416ZM16.7391 16.0726L16.9574 16.2665L16.9649 16.2581L16.9717 16.2492L16.7391 16.0726ZM17.0195 15.8336L16.8868 15.5734L16.882 15.576L17.0195 15.8336ZM17.4261 15.7425L17.4171 16.0346L17.4268 16.0346L17.4261 15.7425ZM17.8152 15.8305L17.9418 15.5674L17.9414 15.5672L17.8152 15.8305ZM18.1483 16.086L18.3703 15.8963L18.3696 15.8955L18.1483 16.086ZM22.6418 21.3442L22.4198 21.5339L22.9339 22.1354V21.3442H22.6418ZM22.6418 16.6396H22.9339L22.9339 16.6374L22.6418 16.6396ZM22.7163 16.2858L22.9827 16.4055L22.984 16.4026L22.7163 16.2858ZM22.9161 16.0022L23.1162 16.2149L23.1165 16.2146L22.9161 16.0022ZM23.2099 15.8129L23.3205 16.0832L23.3213 16.0828L23.2099 15.8129ZM23.5679 15.7425L23.567 16.0346L23.5692 16.0346L23.5679 15.7425ZM24.2063 16.0022L24.415 15.7979L24.4111 15.7941L24.2063 16.0022ZM24.3956 16.2858L24.665 16.1731L24.6643 16.1714L24.3956 16.2858ZM24.4649 16.6396L24.1729 16.6369V16.6396H24.4649ZM24.4649 23.8201H24.1729L24.1729 23.8228L24.4649 23.8201ZM24.3781 24.2092L24.6397 24.3389L24.6412 24.3359L24.3781 24.2092ZM24.1359 24.5144L23.9501 24.2891L23.9404 24.2972L23.9313 24.306L24.1359 24.5144ZM23.901 24.6645L24.0016 24.9386L24.0042 24.9377L23.901 24.6645ZM23.5906 24.7172L23.5951 24.4252H23.5906V24.7172ZM23.4789 24.7172L23.4599 25.0086L23.4694 25.0092H23.4789V24.7172ZM23.1592 24.6138L22.9958 24.856L23.0039 24.8611L23.1592 24.6138ZM22.9036 24.3644L23.1416 24.1952L23.1339 24.1843L23.1252 24.1742L22.9036 24.3644ZM23.089 33.9254L23.0887 33.6334H23.0886L23.089 33.9254ZM23.5379 33.7888L23.3755 33.5461L23.3755 33.5461L23.5379 33.7888ZM23.8354 33.4262L23.5657 33.3143L23.5657 33.3143L23.8354 33.4262ZM23.8818 32.9592L24.1683 32.9026L23.8818 32.9592ZM23.6612 32.5452L23.868 32.339L23.8677 32.3387L23.6612 32.5452ZM22.2964 31.1805L22.2487 30.8924L21.6882 30.9852L22.0899 31.387L22.2964 31.1805ZM28.9499 27.4088L28.7272 27.2199L28.7272 27.2199L28.9499 27.4088ZM31.5867 20.2296L31.8789 20.2297L31.8785 20.2192L31.5867 20.2296ZM31.3399 19.6762L31.5427 19.4661V19.4661L31.3399 19.6762ZM30.2163 19.6762L30.0135 19.4661L30.0135 19.4661L30.2163 19.6762ZM29.9695 20.2296L29.6775 20.2191L29.6775 20.2293L29.9695 20.2296ZM27.19 26.9296L26.9835 26.7231L27.19 26.9296ZM20.4899 29.7092L20.4897 30.0012H20.4902L20.4899 29.7092ZM20.0406 29.8453L20.2027 30.0882L20.2028 30.0881L20.0406 29.8453ZM19.7427 30.2083L20.0126 30.32L20.0126 30.3199L19.7427 30.2083ZM19.697 30.6756L19.4106 30.7328H19.4106L19.697 30.6756ZM19.9188 31.0894L20.1253 30.8829L20.125 30.8827L19.9188 31.0894ZM22.5179 33.6885L22.7249 33.4825L22.7244 33.482L22.5179 33.6885ZM9.42405 21.0082C9.6305 21.2143 9.91032 21.3302 10.2021 21.3302V20.7461C10.0651 20.7461 9.93374 20.6918 9.83677 20.5949L9.42405 21.0082ZM9.10104 20.2304C9.1014 20.5222 9.21759 20.802 9.42405 21.0082L9.83677 20.5949C9.73981 20.4981 9.68526 20.3667 9.68509 20.2297L9.10104 20.2304ZM11.8072 12.8619C10.0611 14.92 9.10218 17.5311 9.10104 20.2299L9.68509 20.2302C9.68617 17.6696 10.596 15.1924 12.2525 13.2398L11.8072 12.8619ZM18.6355 8.99115C15.9729 9.43217 13.5532 10.8039 11.8072 12.8619L12.2525 13.2398C13.9091 11.2872 16.2048 9.98577 18.731 9.56735L18.6355 8.99115ZM17.1121 8.12098L18.4768 9.48574L18.8898 9.07276L17.5251 7.70801L17.1121 8.12098ZM16.8585 7.77508C16.9218 7.91118 17.0124 8.03281 17.1243 8.13255L17.5128 7.69643C17.4602 7.64955 17.4177 7.59248 17.3881 7.52878L16.8585 7.77508ZM16.7563 7.34157C16.7605 7.49154 16.7952 7.63912 16.8586 7.77522L17.388 7.52864C17.3584 7.46494 17.3421 7.39577 17.3401 7.32534L16.7563 7.34157ZM16.8343 6.90308C16.7786 7.04243 16.7521 7.19164 16.7563 7.34157L17.3401 7.32534C17.3381 7.255 17.3506 7.18498 17.3767 7.11957L16.8343 6.90308ZM17.0799 6.53133C16.9735 6.63716 16.8899 6.76362 16.8343 6.90308L17.3767 7.11957C17.4028 7.05427 17.4419 6.99501 17.4918 6.94534L17.0799 6.53133ZM17.4527 6.2875C17.313 6.3425 17.1861 6.4255 17.0798 6.53146L17.492 6.94522C17.5418 6.89561 17.6012 6.85671 17.6667 6.83091L17.4527 6.2875ZM17.8915 6.21148C17.7416 6.20663 17.5922 6.2325 17.4526 6.28753L17.6668 6.83088C17.7322 6.80509 17.8023 6.79295 17.8726 6.79522L17.8915 6.21148ZM18.3246 6.31572C18.1888 6.25182 18.0415 6.21634 17.8915 6.21148L17.8726 6.79522C17.943 6.7975 18.0121 6.81414 18.0758 6.84413L18.3246 6.31572ZM18.6809 6.58321C18.5816 6.47063 18.4603 6.37964 18.3246 6.31573L18.0758 6.84412C18.1395 6.87412 18.1964 6.91682 18.2429 6.96958L18.6809 6.58321ZM21.2674 9.16895L18.6684 6.5699L18.2554 6.98289L20.8544 9.58193L21.2674 9.16895ZM21.5651 9.73251C21.5238 9.52018 21.4208 9.32464 21.269 9.17051L20.8529 9.58037C20.9241 9.65263 20.9724 9.74435 20.9917 9.84392L21.5651 9.73251ZM21.5012 10.3644C21.5841 10.1646 21.6064 9.94487 21.565 9.73242L20.9918 9.84401C21.0111 9.94359 21.0007 10.0467 20.9618 10.1404L21.5012 10.3644ZM21.0985 10.8557C21.2782 10.7351 21.4181 10.5642 21.5011 10.3645L20.9618 10.1403C20.9228 10.2341 20.8571 10.3143 20.773 10.3708L21.0985 10.8557ZM20.4915 11.0425C20.7077 11.0413 20.9189 10.9763 21.0986 10.8557L20.7729 10.3708C20.6887 10.4274 20.5896 10.4579 20.4881 10.4585L20.4915 11.0425ZM13.9963 13.7365C15.7187 12.014 18.0542 11.0452 20.4901 11.0425L20.4895 10.4585C17.8989 10.4613 15.4151 11.4917 13.5833 13.3236L13.9963 13.7365ZM11.3022 20.2304C11.3049 17.7944 12.2738 15.459 13.9963 13.7365L13.5833 13.3236C11.7514 15.1554 10.721 17.6391 10.7182 20.2297L11.3022 20.2304ZM10.98 21.008C11.1864 20.8017 11.3022 20.5218 11.3022 20.2301H10.7182C10.7182 20.367 10.6638 20.4982 10.5671 20.5949L10.98 21.008ZM10.2021 21.3302C10.4939 21.3302 10.7737 21.2143 10.9801 21.0079L10.567 20.595C10.4703 20.6918 10.3391 20.7461 10.2021 20.7461V21.3302ZM18.6297 23.8201V19.0452H18.0457V23.8201H18.6297ZM18.5363 24.2875C18.599 24.139 18.6307 23.9794 18.6297 23.8183L18.0457 23.822C18.0462 23.904 18.0301 23.9851 17.9982 24.0605L18.5363 24.2875ZM18.2708 24.6703C18.3854 24.5625 18.476 24.4318 18.5367 24.2868L17.9979 24.0613C17.9688 24.1307 17.9255 24.1932 17.8707 24.2447L18.2708 24.6703ZM17.8929 24.9162C18.0329 24.8575 18.1611 24.774 18.2714 24.6696L17.87 24.2454C17.8109 24.3013 17.7422 24.3461 17.6671 24.3775L17.8929 24.9162ZM16.9602 24.9169C17.2583 25.0396 17.5929 25.0396 17.8911 24.9169L17.6689 24.3768C17.5131 24.4409 17.3382 24.4409 17.1824 24.3768L16.9602 24.9169ZM16.5803 24.6701C16.6906 24.7739 16.8184 24.8571 16.9576 24.9159L17.1849 24.3779C17.1093 24.346 17.0402 24.301 16.9807 24.2449L16.5803 24.6701ZM16.3151 24.288C16.376 24.4318 16.466 24.5617 16.5795 24.6694L16.9814 24.2456C16.9263 24.1933 16.8825 24.1302 16.8528 24.06L16.3151 24.288ZM16.2226 23.8175C16.2211 23.9785 16.2524 24.1381 16.3145 24.2867L16.8533 24.0613C16.8218 23.9858 16.8059 23.9047 16.8066 23.8228L16.2226 23.8175ZM16.2226 16.6686V23.8201H16.8066V16.6686H16.2226ZM16.3008 16.2374C16.2479 16.3757 16.2214 16.5228 16.2226 16.671L16.8066 16.6662C16.806 16.5909 16.8195 16.5162 16.8463 16.4459L16.3008 16.2374ZM16.5208 15.8787C16.4277 15.9834 16.3536 16.1038 16.302 16.2342L16.8451 16.4491C16.8716 16.3822 16.9096 16.3204 16.9574 16.2665L16.5208 15.8787ZM16.882 15.576C16.7352 15.6543 16.6071 15.7635 16.5065 15.8961L16.9717 16.2492C17.0213 16.1838 17.0846 16.1299 17.1571 16.0912L16.882 15.576ZM17.4351 15.4507C17.245 15.4448 17.0564 15.4869 16.8868 15.5734L17.1522 16.0937C17.2341 16.052 17.3251 16.0316 17.4171 16.0344L17.4351 15.4507ZM17.9414 15.5672C17.7804 15.49 17.6041 15.4501 17.4254 15.4505L17.4268 16.0346C17.5175 16.0343 17.6071 16.0546 17.6889 16.0938L17.9414 15.5672ZM18.3696 15.8955C18.2511 15.7579 18.1055 15.6461 17.9418 15.5674L17.6886 16.0937C17.7798 16.1375 17.8609 16.1998 17.927 16.2765L18.3696 15.8955ZM22.8638 21.1545L18.3703 15.8963L17.9263 16.2758L22.4198 21.5339L22.8638 21.1545ZM22.3498 16.6396V21.3442H22.9339V16.6396H22.3498ZM22.45 16.166C22.3828 16.3155 22.3486 16.4778 22.3498 16.6418L22.9339 16.6374C22.9333 16.5575 22.9499 16.4784 22.9827 16.4055L22.45 16.166ZM22.716 15.7896C22.6022 15.8966 22.5112 16.0257 22.4487 16.169L22.984 16.4026C23.0149 16.3317 23.0599 16.2679 23.1162 16.2149L22.716 15.7896ZM23.0993 15.5426C22.9573 15.6007 22.8272 15.6845 22.7157 15.7898L23.1165 16.2146C23.1758 16.1587 23.245 16.1141 23.3205 16.0832L23.0993 15.5426ZM23.5688 15.4505C23.4075 15.45 23.2477 15.4814 23.0985 15.543L23.3213 16.0828C23.3992 16.0507 23.4827 16.0343 23.567 16.0346L23.5688 15.4505ZM24.4111 15.7941C24.1859 15.5726 23.8823 15.4491 23.5666 15.4505L23.5692 16.0346C23.7309 16.0338 23.8863 16.0971 24.0015 16.2104L24.4111 15.7941ZM24.6643 16.1714C24.6051 16.0324 24.5206 15.9058 24.4149 15.7979L23.9976 16.2066C24.0524 16.2625 24.0962 16.3281 24.1269 16.4001L24.6643 16.1714ZM24.7569 16.6422C24.7584 16.4812 24.7271 16.3216 24.665 16.1731L24.1262 16.3985C24.1578 16.474 24.1737 16.5551 24.1729 16.6369L24.7569 16.6422ZM24.757 23.8201V16.6396H24.1729V23.8201H24.757ZM24.6412 24.3359C24.719 24.1742 24.7586 23.9968 24.7569 23.8175L24.1729 23.8228C24.1737 23.9127 24.1539 24.0016 24.1149 24.0825L24.6412 24.3359ZM24.3217 24.7398C24.4548 24.63 24.5631 24.4934 24.6397 24.3389L24.1164 24.0795C24.0763 24.1604 24.0197 24.2318 23.9501 24.2891L24.3217 24.7398ZM24.0042 24.9377C24.1299 24.8902 24.2445 24.8171 24.3405 24.7229L23.9313 24.306C23.8933 24.3433 23.8479 24.3724 23.7979 24.3913L24.0042 24.9377ZM23.5861 25.0092C23.7279 25.0114 23.8687 24.9874 24.0016 24.9386L23.8005 24.3903C23.7347 24.4144 23.665 24.4263 23.5951 24.4252L23.5861 25.0092ZM23.4789 25.0092H23.5906V24.4252H23.4789V25.0092ZM23.0039 24.8611C23.1414 24.9474 23.2981 24.998 23.4599 25.0086L23.498 24.4258C23.4328 24.4215 23.3697 24.4011 23.3145 24.3664L23.0039 24.8611ZM22.6657 24.5337C22.7555 24.66 22.8673 24.7691 22.9959 24.8559L23.3225 24.3717C23.2521 24.3242 23.1908 24.2644 23.1416 24.1952L22.6657 24.5337ZM18.1161 19.2354L22.682 24.5546L23.1252 24.1742L18.5593 18.855L18.1161 19.2354ZM23.0886 33.6334C23.021 33.6335 22.954 33.6202 22.8916 33.5943L22.6678 34.1338C22.8014 34.1892 22.9447 34.2176 23.0894 34.2175L23.0886 33.6334ZM23.3755 33.5461C23.2906 33.6029 23.1908 33.6333 23.0887 33.6334L23.0894 34.2175C23.3068 34.2172 23.5194 34.1525 23.7003 34.0316L23.3755 33.5461ZM23.5657 33.3143C23.5266 33.4087 23.4604 33.4894 23.3755 33.5461L23.7002 34.0316C23.881 33.9107 24.0219 33.7389 24.1052 33.538L23.5657 33.3143ZM23.5953 33.0159C23.6151 33.1161 23.6048 33.2199 23.5657 33.3143L24.1052 33.5381C24.1886 33.3371 24.2105 33.1159 24.1683 32.9026L23.5953 33.0159ZM23.4543 32.7513C23.5264 32.8236 23.5755 32.9157 23.5953 33.0159L24.1683 32.9026C24.126 32.6892 24.0216 32.4931 23.868 32.339L23.4543 32.7513ZM22.0899 31.387L23.4547 32.7517L23.8677 32.3387L22.5029 30.974L22.0899 31.387ZM28.7272 27.2199C27.0707 29.1725 24.7749 30.4739 22.2487 30.8924L22.3442 31.4686C25.0068 31.0275 27.4266 29.6558 29.1725 27.5977L28.7272 27.2199ZM31.2947 20.2295C31.2935 22.7901 30.3837 25.2673 28.7272 27.2199L29.1725 27.5977C30.9186 25.5396 31.8775 22.9287 31.8787 20.2297L31.2947 20.2295ZM31.1371 19.8864C31.2335 19.9794 31.2901 20.1062 31.2949 20.24L31.8785 20.2192C31.8683 19.9341 31.7479 19.6641 31.5427 19.4661L31.1371 19.8864ZM30.7781 19.7414C30.912 19.7414 31.0408 19.7934 31.1371 19.8864L31.5427 19.4661C31.3374 19.2681 31.0633 19.1574 30.7781 19.1574V19.7414ZM30.419 19.8864C30.5155 19.7934 30.6442 19.7414 30.7781 19.7414V19.1574C30.4928 19.1574 30.2188 19.2681 30.0135 19.4661L30.419 19.8864ZM30.2613 20.24C30.2661 20.1062 30.3227 19.9794 30.4191 19.8864L30.0135 19.4661C29.8083 19.6641 29.6878 19.9341 29.6776 20.2192L30.2613 20.24ZM27.3965 27.1361C29.2283 25.3043 30.2587 22.8205 30.2615 20.2299L29.6775 20.2293C29.6748 22.6652 28.7059 25.0007 26.9835 26.7231L27.3965 27.1361ZM20.4902 30.0012C23.0809 29.9984 25.5646 28.968 27.3965 27.1361L26.9835 26.7231C25.261 28.4456 22.9256 29.4145 20.4896 29.4171L20.4902 30.0012ZM20.2028 30.0881C20.2877 30.0314 20.3876 30.0011 20.4897 30.0012L20.4901 29.4171C20.2724 29.417 20.0594 29.4815 19.8783 29.6025L20.2028 30.0881ZM20.0126 30.3199C20.0516 30.2256 20.1178 30.1449 20.2027 30.0882L19.8784 29.6025C19.6973 29.7234 19.5561 29.8954 19.4729 30.0967L20.0126 30.3199ZM19.9834 30.6183C19.9633 30.5181 19.9735 30.4143 20.0126 30.32L19.4729 30.0966C19.3896 30.2978 19.368 30.5192 19.4106 30.7328L19.9834 30.6183ZM20.125 30.8827C20.0527 30.8105 20.0034 30.7185 19.9834 30.6183L19.4106 30.7328C19.4533 30.9463 19.5583 31.1423 19.7125 31.2962L20.125 30.8827ZM22.7244 33.482L20.1253 30.8829L19.7123 31.2959L22.3114 33.895L22.7244 33.482ZM22.8916 33.5943C22.8292 33.5684 22.7725 33.5304 22.7249 33.4825L22.3108 33.8944C22.4128 33.997 22.5342 34.0783 22.6678 34.1338L22.8916 33.5943Z" fill="#171926" mask="url(#path-3-outside-1)"/>
    </svg>

);
