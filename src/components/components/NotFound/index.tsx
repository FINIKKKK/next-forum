import ss from "./NotFound.module.scss";
import React from "react";

interface NotFoundProps {
  label?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ label }) => {
  return (
    <div className={ss.notfound}>
      <svg
        width="273"
        height="273"
        viewBox="0 0 273 273"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M118.573 197.424C118.573 197.424 93.8666 197.424 85.7676 197.424C77.6686 197.424 76.1216 199.335 79.5341 200.746C82.9466 202.156 66.6121 201.474 63.8366 203.976C61.0156 206.479 68.2046 207.434 75.9851 207.434C83.7656 207.434 132.269 207.434 138.502 207.434C144.736 207.434 143.189 202.884 139.458 202.293C135.727 201.701 145.509 202.52 149.24 201.201C152.971 199.881 150.287 197.424 118.573 197.424Z"
          fill="#4E3C6B"
        />
        <path
          d="M166.439 205.751C165.483 207.07 162.298 207.389 156.884 207.252C152.789 207.116 148.512 206.797 148.512 204.886C148.512 202.975 158.931 203.203 162.571 203.612C165.711 203.976 166.985 204.977 166.439 205.751Z"
          fill="#574378"
        />
        <path
          d="M72.1629 199.381C71.5259 200.336 69.3419 200.609 65.5199 200.609C62.6534 200.609 59.6504 200.473 59.5594 199.153C59.4684 197.788 66.7939 197.743 69.3874 197.97C71.5714 198.152 72.5269 198.789 72.1629 199.381Z"
          fill="#574378"
        />
        <path
          d="M232.369 196.287H216.125C214.851 196.287 213.805 195.24 213.805 193.966V177.177C213.805 175.903 214.851 174.856 216.125 174.856H232.369C233.643 174.856 234.689 175.903 234.689 177.177V193.966C234.689 195.24 233.643 196.287 232.369 196.287Z"
          fill="#554371"
        />
        <path
          d="M231.595 195.513H215.988C214.76 195.513 213.759 194.512 213.759 193.284V177.086C213.759 175.857 214.76 174.856 215.988 174.856H231.595C232.823 174.856 233.824 175.857 233.824 177.086V193.284C233.824 194.512 232.823 195.513 231.595 195.513Z"
          fill="#443759"
        />
        <path
          d="M223.95 191.919C227.569 191.919 230.502 188.986 230.502 185.367C230.502 181.748 227.569 178.815 223.95 178.815C220.332 178.815 217.398 181.748 217.398 185.367C217.398 188.986 220.332 191.919 223.95 191.919Z"
          fill="#554371"
        />
        <path
          d="M221.358 188.325C221.13 188.325 220.948 188.143 220.948 187.915V182.865C220.948 182.637 221.13 182.455 221.358 182.455C221.585 182.455 221.767 182.637 221.767 182.865V187.915C221.767 188.143 221.585 188.325 221.358 188.325Z"
          fill="#29213D"
        />
        <path
          d="M226.09 188.325C225.863 188.325 225.681 188.143 225.681 187.915V182.865C225.681 182.637 225.863 182.455 226.09 182.455C226.318 182.455 226.5 182.637 226.5 182.865V187.915C226.5 188.143 226.318 188.325 226.09 188.325Z"
          fill="#29213D"
        />
        <path
          d="M184.275 167.895C183.956 167.895 183.638 167.895 183.319 167.849C176.267 167.349 171.444 164.937 163.345 152.607C160.524 148.33 158.613 143.962 156.747 139.73C153.562 132.496 150.832 126.217 144.644 123.305C135.135 118.846 125.807 126.217 125.716 126.308C125.307 126.626 124.715 126.581 124.397 126.171C124.078 125.762 124.124 125.17 124.533 124.852C124.943 124.533 134.862 116.662 145.418 121.621C152.243 124.806 155.246 131.677 158.431 138.957C160.251 143.143 162.162 147.465 164.892 151.56C172.581 163.208 176.995 165.483 183.456 165.984C188.279 166.348 190.872 163.436 193.375 160.569C194.285 159.568 195.104 158.613 196.059 157.794C199.745 154.654 203.612 154.063 203.794 154.063C204.295 153.972 204.795 154.336 204.841 154.836C204.932 155.337 204.568 155.837 204.067 155.883C204.022 155.883 200.564 156.429 197.288 159.204C196.423 159.932 195.65 160.842 194.785 161.798C192.237 164.71 189.416 167.895 184.275 167.895Z"
          fill="#29213D"
        />
        <path
          d="M210.756 150.923L214.578 147.693C214.987 147.374 215.533 147.42 215.852 147.829C216.125 148.193 216.079 148.694 215.715 149.012L211.848 152.425L210.756 150.923Z"
          fill="#29213D"
        />
        <path
          d="M208.39 148.193L212.212 144.963C212.621 144.644 213.167 144.69 213.486 145.099C213.759 145.463 213.713 145.964 213.349 146.282L209.482 149.695L208.39 148.193Z"
          fill="#29213D"
        />
        <path
          d="M213.44 152.607C213.44 152.607 211.939 154.382 209.618 156.429C207.298 158.431 204.295 158.067 202.93 156.52C202.839 156.429 202.793 156.338 202.702 156.247C201.519 154.609 201.474 152.38 203.248 150.787C205.114 149.058 208.208 146.601 208.208 146.601L211.939 150.924L213.44 152.607Z"
          fill="#443759"
        />
        <path
          d="M213.44 152.607C213.44 152.607 211.939 154.381 209.618 156.429C207.298 158.431 204.295 158.067 202.93 156.52C202.839 156.429 202.793 156.338 202.702 156.247C203.794 156.247 205.66 156.019 207.343 154.882C208.754 153.926 210.574 152.243 211.893 150.923L213.44 152.607Z"
          fill="#554371"
        />
        <path
          d="M143.825 187.46C143.78 187.46 143.689 187.46 143.643 187.46C140.549 187.414 132.496 181.363 130.448 178.542C128.355 175.721 126.49 172.126 129.038 169.806C129.538 169.351 130.266 169.032 131.085 168.896C132.314 168.668 133.815 168.941 135.089 169.76C137.273 171.171 143.416 178.314 145.145 181.363C146.828 184.366 146.783 187.414 143.825 187.46Z"
          fill="#29213D"
        />
        <path
          d="M143.825 187.46C144.28 187.187 144.598 186.732 144.871 185.822C145.326 184.229 143.734 181.044 138.501 174.947C135.362 171.262 132.677 169.624 131.085 168.896C132.313 168.668 133.815 168.941 135.089 169.76C137.273 171.171 143.415 178.314 145.144 181.363C146.828 184.366 146.782 187.414 143.825 187.46Z"
          fill="#534469"
        />
        <path
          d="M128.446 171.762C128.901 170.488 131.54 170.716 133.815 172.945C136.09 175.175 139.548 179.588 138.684 181.499C137.819 183.41 134.543 181.863 131.859 179.224C129.174 176.585 127.718 173.81 128.446 171.762Z"
          fill="#54466B"
        />
        <path
          d="M134.179 177.45C134.088 178.906 133.542 179.816 133.542 179.816C133.542 179.816 121.303 185.64 105.969 174.947C90.3629 164.073 90.3174 150.514 90.3174 150.377C98.3254 142.551 107.334 151.151 107.334 151.151C107.334 151.151 107.88 156.019 110.337 160.933C111.748 163.754 113.795 166.621 116.707 168.532C123.987 173.309 131.54 171.853 131.54 171.853C131.54 171.853 132.996 172.308 133.861 175.084C134.179 175.903 134.27 176.767 134.179 177.45Z"
          fill="#443759"
        />
        <path
          d="M134.179 177.45C134.088 178.906 133.542 179.816 133.542 179.816C133.542 179.816 121.303 185.64 105.969 174.947C90.3629 164.073 90.3174 150.514 90.3174 150.377C98.3254 142.551 107.334 151.151 107.334 151.151C107.334 151.151 107.88 156.019 110.337 160.933C109.109 161.843 107.562 162.799 106.379 163.163C103.876 163.891 101.192 163.891 101.192 163.891C101.192 163.891 108.881 175.402 120.256 177.495C126.399 178.542 131.131 178.087 134.179 177.45Z"
          fill="#554371"
        />
        <path
          d="M117.025 179.77C116.798 179.77 116.57 179.633 116.479 179.36C116.343 179.042 116.525 178.723 116.843 178.587C116.889 178.587 119.346 177.631 120.074 175.629C120.847 173.582 120.21 171.944 120.21 171.944C120.074 171.625 120.256 171.307 120.529 171.17C120.847 171.034 121.166 171.216 121.302 171.489C121.348 171.58 122.076 173.582 121.166 176.039C120.21 178.587 117.344 179.633 117.207 179.679C117.162 179.77 117.071 179.77 117.025 179.77Z"
          fill="#554371"
        />
        <path
          d="M106.469 175.084C106.151 175.084 105.878 174.856 105.878 174.538C105.878 174.219 106.105 173.946 106.424 173.901C106.469 173.901 109.654 173.673 111.247 171.58C112.839 169.487 112.748 167.349 112.748 167.303C112.703 166.985 112.976 166.666 113.294 166.666C113.613 166.621 113.931 166.894 113.931 167.212C113.931 167.303 114.113 169.806 112.202 172.308C110.246 174.811 106.651 175.038 106.469 175.084Z"
          fill="#554371"
        />
        <path
          d="M84.9034 166.484C84.7214 166.894 84.4939 167.303 84.1754 167.713C83.5839 168.486 82.9014 168.941 82.2644 169.26C81.3544 169.715 80.6264 169.806 80.6264 169.806C80.6264 169.806 74.2109 163.572 68.6144 152.47C63.0179 141.414 62.6084 128.674 62.6084 128.674C63.1089 128.401 63.6094 128.173 64.0644 127.991C65.7934 127.309 67.3859 127.263 68.7054 127.445C70.7074 127.718 71.9814 128.583 71.9814 128.583C71.9814 128.583 72.3454 139.139 76.0764 148.648C79.8074 158.203 85.2674 163.845 85.2674 163.845C85.2674 163.845 85.4949 165.074 84.9034 166.484Z"
          fill="#443759"
        />
        <path
          d="M84.9035 166.484C82.9015 164.71 79.0795 160.66 75.394 152.834C70.9805 143.461 69.206 131.404 68.751 127.445C70.753 127.718 72.027 128.583 72.027 128.583C72.027 128.583 72.391 139.139 76.122 148.648C79.853 158.203 85.313 163.845 85.313 163.845C85.313 163.845 85.495 165.074 84.9035 166.484Z"
          fill="#4F3E6B"
        />
        <path
          d="M82.2644 169.26C81.3544 169.715 80.6264 169.806 80.6264 169.806C80.6264 169.806 74.2109 163.573 68.6144 152.471C63.0179 141.414 62.6084 128.674 62.6084 128.674C63.1089 128.401 63.6094 128.174 64.0644 127.992C64.3829 132.087 65.8844 145.555 72.2544 156.111C76.6224 163.3 80.1259 167.213 82.2644 169.26Z"
          fill="#554371"
        />
        <path
          d="M94.9585 175.811C94.9585 175.811 92.5925 177.222 89.817 176.585C87.0415 175.948 85.995 175.038 85.995 175.038C85.995 175.038 85.085 173.673 85.7675 172.899C85.813 172.854 85.813 172.854 85.8585 172.808C86.723 172.035 87.906 171.898 87.906 171.898C87.906 171.898 89.544 173.172 90.727 173.582C91.91 173.991 94.003 173.582 94.7765 174.082C95.1405 174.31 95.186 174.719 95.1405 175.083C95.1405 175.493 94.9585 175.811 94.9585 175.811Z"
          fill="#443759"
        />
        <path
          d="M94.9585 175.811C94.9585 175.811 92.5925 177.222 89.817 176.585C87.0415 175.948 85.995 175.038 85.995 175.038C85.995 175.038 85.085 173.673 85.7675 172.899C86.5865 173.673 88.543 175.356 90.818 175.629C92.6835 175.857 94.2305 175.447 95.1405 175.083C95.1405 175.493 94.9585 175.811 94.9585 175.811Z"
          fill="#554371"
        />
        <path
          d="M94.0941 174.538C91.7281 174.902 90.0446 174.265 88.7706 173.582C87.4966 172.9 86.9961 172.035 86.9961 172.035C86.9961 172.035 86.9961 170.989 87.6786 170.443C88.0426 170.124 88.6341 169.988 89.5441 170.261C89.5441 170.261 91.3186 171.808 94.2761 170.761C97.2336 169.715 97.0516 169.078 97.6886 168.896C98.1436 168.759 98.7351 169.442 98.8716 170.215C98.9626 170.579 98.9171 170.943 98.7806 171.262C98.2801 172.263 96.4601 174.128 94.0941 174.538Z"
          fill="#443759"
        />
        <path
          d="M94.0941 174.538C91.7281 174.902 90.0446 174.265 88.7706 173.582C87.4966 172.9 86.9961 172.035 86.9961 172.035C86.9961 172.035 86.9961 170.989 87.6786 170.443C88.7706 171.535 91.1366 173.491 93.7301 172.991C96.2781 172.49 98.0981 170.989 98.9171 170.215C99.0081 170.579 98.9626 170.943 98.8261 171.262C98.2801 172.263 96.4601 174.128 94.0941 174.538Z"
          fill="#554371"
        />
        <path
          d="M93.5934 171.535C91.3184 171.899 89.7259 171.262 88.5429 170.625C87.3144 169.988 86.8594 169.169 86.8594 169.169C86.8594 169.169 86.8594 168.168 87.4964 167.622C87.8604 167.303 88.4064 167.167 89.2709 167.44C89.2709 167.44 90.9544 168.896 93.7754 167.895C96.5964 166.894 96.4144 166.302 97.0059 166.12C97.4154 165.984 98.0069 166.666 98.1434 167.394C98.2344 167.713 98.1889 168.077 98.0524 168.395C97.5519 169.396 95.8229 171.171 93.5934 171.535Z"
          fill="#443759"
        />
        <path
          d="M93.5934 171.535C91.3184 171.899 89.7259 171.262 88.5429 170.625C87.3144 169.988 86.8594 169.169 86.8594 169.169C86.8594 169.169 86.8594 168.168 87.4964 167.622C88.4974 168.668 90.7724 170.534 93.2294 170.033C95.6409 169.533 97.3699 168.122 98.1434 167.394C98.2344 167.713 98.1889 168.077 98.0524 168.395C97.5519 169.396 95.8229 171.171 93.5934 171.535Z"
          fill="#554371"
        />
        <path
          d="M93.2752 169.26C91.3187 169.897 89.7717 169.578 88.6342 169.169C87.4512 168.759 86.9507 168.122 86.9507 168.122C86.9507 168.122 86.8142 167.212 87.3602 166.666C87.6332 166.348 88.1337 166.166 88.9527 166.257C88.9527 166.257 90.6362 167.303 93.0477 166.075C95.4592 164.801 95.2317 164.3 95.7322 164.027C96.0962 163.845 96.6877 164.346 96.9152 164.983C97.0062 165.256 97.0517 165.574 96.9607 165.893C96.5967 166.803 95.2317 168.623 93.2752 169.26Z"
          fill="#443759"
        />
        <path
          d="M93.2752 169.259C91.3187 169.896 89.7717 169.578 88.6342 169.168C87.4512 168.759 86.9507 168.122 86.9507 168.122C86.9507 168.122 86.8142 167.212 87.3602 166.666C88.4067 167.439 90.6362 168.804 92.7747 168.031C94.9132 167.257 96.2782 165.756 96.8697 164.982C96.9607 165.255 97.0062 165.574 96.9152 165.892C96.5967 166.802 95.2317 168.622 93.2752 169.259Z"
          fill="#554371"
        />
        <path
          d="M91.6826 167.076C91.6826 167.076 91.5461 167.849 91.2276 168.896C90.8636 170.079 90.3176 171.535 89.4986 172.672C89.1346 173.127 88.7706 173.537 88.4066 173.855C87.1781 174.993 86.0406 175.22 86.0406 175.22C86.0406 175.22 82.5371 171.853 81.5361 170.716C80.5351 169.624 79.7161 168.441 79.7161 168.441C79.7161 168.441 79.4431 167.167 79.7161 165.802C79.8526 165.074 80.1256 164.3 80.6716 163.709C80.9446 163.436 81.2631 163.208 81.5361 163.026C83.0376 162.253 84.7666 162.844 84.7666 162.844C84.7666 162.844 88.1336 164.937 89.6351 165.756C91.1366 166.575 91.6826 167.076 91.6826 167.076Z"
          fill="#443759"
        />
        <path
          d="M91.6826 167.076C91.6826 167.076 91.5461 167.849 91.2276 168.896C90.5451 168.532 89.3166 167.758 87.6786 166.575C85.5401 165.074 82.4916 163.527 81.5361 163.026C83.0376 162.253 84.7666 162.844 84.7666 162.844C84.7666 162.844 88.1336 164.937 89.6351 165.756C91.1366 166.575 91.6826 167.076 91.6826 167.076Z"
          fill="#4F3E6B"
        />
        <path
          d="M88.4066 173.81C87.1781 174.902 86.0406 175.175 86.0406 175.175C86.0406 175.175 82.5371 171.762 81.5361 170.67C80.5351 169.578 79.7161 168.395 79.7161 168.395C79.7161 168.395 79.4431 167.121 79.7161 165.756C81.1266 167.349 84.9031 171.444 87.5421 173.173C87.8606 173.446 88.1791 173.628 88.4066 173.81Z"
          fill="#554371"
        />
        <path
          d="M75.3935 162.162C74.711 162.116 74.3015 161.889 74.256 161.889C73.983 161.752 73.892 161.388 74.0285 161.115C74.165 160.842 74.4835 160.706 74.7565 160.842C74.802 160.888 76.076 161.479 77.7595 160.387C79.443 159.295 79.716 157.93 79.716 157.885C79.7615 157.566 80.0345 157.339 80.353 157.43C80.626 157.475 80.8535 157.794 80.808 158.112C80.808 158.203 80.4895 160.023 78.351 161.434C77.1225 162.116 76.1215 162.207 75.3935 162.162Z"
          fill="#554371"
        />
        <path
          d="M70.5249 153.016C69.5694 152.925 68.9324 152.607 68.8869 152.607C68.6139 152.47 68.5229 152.106 68.6594 151.833C68.7959 151.56 69.1144 151.424 69.3419 151.56C69.3874 151.606 70.9799 152.379 73.0729 151.424C75.1204 150.514 75.4844 149.194 75.4844 149.103C75.5754 148.785 75.8484 148.603 76.1214 148.694C76.3944 148.785 76.5764 149.103 76.4854 149.422C76.4854 149.513 75.9849 151.333 73.4369 152.516C72.2994 153.016 71.2984 153.107 70.5249 153.016Z"
          fill="#554371"
        />
        <path
          d="M67.0672 142.779C65.7477 142.688 65.0652 142.142 65.0197 142.096C64.7922 141.914 64.7467 141.55 64.9287 141.277C65.1107 141.004 65.4292 140.959 65.7022 141.186C65.7477 141.186 66.7487 141.96 68.9782 141.505C71.7992 140.913 72.5727 139.821 72.6182 139.776C72.8002 139.503 73.1187 139.457 73.3917 139.639C73.6192 139.821 73.6647 140.185 73.4827 140.458C73.3917 140.595 72.3907 141.914 69.2057 142.642C68.3412 142.824 67.6587 142.824 67.0672 142.779Z"
          fill="#554371"
        />
        <path
          d="M73.8013 135.18C73.8013 135.18 71.0713 136.591 67.2038 136.545C65.2928 136.5 63.9733 136.136 63.1088 135.726C62.1988 135.317 61.7893 134.907 61.7893 134.907C61.7893 134.907 61.8348 134.088 61.6983 131.404C61.2433 122.941 65.0653 121.849 67.5678 121.758C68.1593 121.758 68.7963 121.849 69.3423 122.031C71.1623 122.668 72.7093 124.306 73.3008 126.308C74.0743 129.083 73.8013 135.18 73.8013 135.18Z"
          fill="#29213D"
        />
        <path
          d="M68.2044 126.99C65.3379 128.537 64.1549 127.536 64.1549 127.536C64.1549 127.536 63.4724 129.857 63.1539 134.452C63.1084 134.907 63.1084 135.362 63.0629 135.726C62.1529 135.317 61.7434 134.907 61.7434 134.907C61.7434 134.907 61.7889 134.088 61.6524 131.404C61.1974 122.941 65.0194 121.849 67.5219 121.758C68.1134 121.758 68.7504 121.849 69.2964 122.031C70.0244 123.259 70.8434 125.58 68.2044 126.99Z"
          fill="#534469"
        />
        <path
          d="M126.308 141.187C126.172 141.915 126.035 142.597 125.853 143.28C124.761 147.511 122.85 150.924 120.166 153.153C112.476 159.569 101.92 162.981 88.361 154.2C77.532 147.193 67.5675 131.313 63.973 125.171C63.063 123.624 62.5625 122.668 62.5625 122.668C62.5625 122.668 68.796 122.35 78.624 117.845C82.6735 115.98 87.36 113.386 92.5015 109.837C101.374 103.649 106.516 97.8709 109.473 93.3664C112.977 88.0884 113.477 84.6304 113.477 84.6304C113.477 84.6304 114.342 86.2229 115.843 89.7264C117.663 94.0489 120.393 101.238 123.487 111.885C126.808 123.351 127.719 133.497 126.308 141.187Z"
          fill="#443759"
        />
        <path
          d="M115.843 89.726C114.796 91.819 113.34 94.276 111.429 96.9605C107.698 102.056 102.147 107.926 93.9571 113.204C88.9066 116.48 84.4021 118.846 80.4436 120.575C72.3446 124.169 66.7481 124.988 63.9271 125.125C63.0171 123.578 62.5166 122.622 62.5166 122.622C62.5166 122.622 68.7501 122.304 78.5781 117.799C82.6276 115.934 87.3141 113.34 92.4556 109.791C101.328 103.603 106.47 97.825 109.427 93.3205C112.931 88.0425 113.431 84.5845 113.431 84.5845C113.431 84.5845 114.387 86.268 115.843 89.726Z"
          fill="#29213D"
        />
        <path
          d="M125.853 143.28C124.761 147.511 122.85 150.924 120.166 153.153C112.476 159.569 101.92 162.981 88.361 154.2C77.532 147.193 67.5675 131.313 63.973 125.171C63.063 123.624 62.5625 122.668 62.5625 122.668C62.5625 122.668 68.796 122.35 78.624 117.845C82.4915 123.851 91.0455 136.273 99.463 143.598C109.246 152.152 120.393 147.102 125.853 143.28Z"
          fill="#554371"
        />
        <path
          d="M80.4436 120.621C72.3446 124.215 66.7481 125.034 63.9271 125.171C63.0171 123.624 62.5166 122.668 62.5166 122.668C62.5166 122.668 68.7501 122.35 78.5781 117.845C79.1241 118.664 79.7611 119.62 80.4436 120.621Z"
          fill="#54466B"
        />
        <path
          d="M125.034 136.773C123.897 132.086 122.35 126.171 120.393 119.892C117.254 109.7 113.705 101.829 111.748 98.4163C114.478 94.2758 114.979 92.5923 114.979 92.5923C114.979 92.5923 115.661 93.8663 116.844 96.5963C118.255 99.9633 120.393 105.605 122.805 113.932C125.444 122.85 126.172 130.767 125.034 136.773Z"
          fill="#4F3E6B"
        />
        <path
          d="M115.843 89.726C114.796 91.819 113.34 94.276 111.429 96.9605C110.701 95.55 110.064 94.3215 109.473 93.3205C112.976 88.0425 113.477 84.5845 113.477 84.5845C113.477 84.5845 114.387 86.268 115.843 89.726Z"
          fill="#534469"
        />
        <path
          d="M101.601 140.595C101.601 140.595 97.5064 143.689 89.1799 147.147C86.8594 148.102 84.5844 148.921 82.5369 149.604C82.3549 149.422 82.1729 149.24 81.9909 149.058C76.1669 143.461 70.9344 136.227 67.3854 130.767C67.1579 130.448 66.9759 130.13 66.7939 129.857C67.1579 129.766 73.2549 128.219 80.6714 124.897C88.3609 121.485 90.3174 119.938 90.3174 119.938L101.601 140.595Z"
          fill="#443759"
        />
        <path
          d="M100.327 140.549C100.327 140.549 96.6418 143.507 88.8158 146.601C86.4043 147.556 83.9928 148.375 81.9453 149.058C76.1213 143.461 70.8888 136.227 67.3398 130.767L68.0678 130.585C68.0678 130.585 73.8008 129.129 80.8988 125.989C87.9968 122.804 89.9988 121.758 89.9988 121.758L100.327 140.549Z"
          fill="#29213D"
        />
        <path
          d="M80.0345 142.324C79.898 142.324 79.716 142.278 79.625 142.187L74.62 137.728L74.3015 138.684C74.165 139.002 73.8465 139.184 73.528 139.048C73.2095 138.911 73.0275 138.593 73.164 138.274L73.801 136.454C73.892 136.272 74.0285 136.09 74.2105 136.045C74.3925 135.999 74.62 136.045 74.802 136.181L79.2155 140.094L78.988 138.32C78.9425 138.047 79.079 137.774 79.352 137.683L94.4125 131.176C94.731 131.04 95.095 131.176 95.2315 131.495C95.368 131.813 95.2315 132.177 94.913 132.314L80.262 138.638L80.6715 141.596C80.717 141.869 80.5805 142.096 80.353 142.233C80.2165 142.278 80.1255 142.324 80.0345 142.324Z"
          fill="#554371"
        />
        <path
          d="M113.477 84.6302C113.477 84.6302 112.794 89.4987 107.562 96.2782C104.559 100.191 100.009 104.741 93.1838 109.382C81.9908 117.026 73.1638 120.257 67.8858 121.667C64.4278 122.577 62.5168 122.668 62.5168 122.668C62.5168 122.668 51.0963 103.194 52.9618 85.5402C53.4623 80.9447 54.8728 77.1227 57.0113 73.9832C58.5583 71.6627 60.4693 69.7517 62.6533 68.1592C68.9778 63.6092 77.4863 62.0167 85.7673 63.0177C100.873 64.8832 113.477 84.6302 113.477 84.6302Z"
          fill="#554371"
        />
        <path
          d="M113.477 84.6304C113.477 84.6304 113.158 86.8144 111.429 90.2724C110.565 92.0014 109.336 94.0489 107.562 96.3239C104.559 100.237 100.009 104.787 93.1836 109.428C81.1261 117.618 71.7986 120.757 66.7481 121.986C64.0181 122.623 62.5166 122.714 62.5166 122.714C62.5166 122.577 62.5621 112.112 79.5791 98.8264C96.6871 85.4039 113.477 84.6304 113.477 84.6304Z"
          fill="#4C396B"
        />
        <path
          d="M111.429 90.272C110.565 92.001 109.336 94.0485 107.562 96.3235C104.559 100.236 100.009 104.786 93.1835 109.427C81.126 117.617 71.7985 120.757 66.748 121.985C68.659 117.617 72.845 111.156 82.2635 103.785C93.8205 94.731 105.241 91.455 111.429 90.272Z"
          fill="#5D4D77"
        />
        <path
          d="M113.476 84.6302C113.476 84.6302 112.794 89.4987 107.561 96.2782C104.649 91.2732 102.056 88.1337 102.056 88.1337C102.056 88.1337 95.3674 94.1852 89.9074 89.8627C84.4474 85.4947 88.5424 77.4867 88.5424 77.4867C88.5424 77.4867 83.0369 71.5717 74.0734 69.6607C69.6144 68.7052 65.5649 68.2957 62.6074 68.1592C68.9319 63.6092 77.4404 62.0167 85.7214 63.0177C100.873 64.8832 113.476 84.6302 113.476 84.6302Z"
          fill="#5F4D7B"
        />
        <path
          d="M67.9317 121.667C64.4737 122.577 62.5627 122.668 62.5627 122.668C62.5627 122.668 51.1422 103.194 53.0077 85.5404C53.5082 80.9449 54.9187 77.1229 57.0572 73.9834C56.5567 79.2159 56.1472 91.3189 60.3332 104.377C62.4262 111.02 65.2472 116.935 67.9317 121.667Z"
          fill="#5F4D7B"
        />
        <path
          d="M119.893 200.928C119.893 201.201 119.893 201.474 119.847 201.793C119.665 204.477 111.43 204.978 105.697 205.251C100.055 205.524 94.094 203.931 96.1415 202.066C96.187 202.02 96.187 202.02 96.2325 201.975C97.6885 200.746 100.51 199.336 103.649 198.198C105.469 197.516 107.335 196.97 109.2 196.515C111.657 195.923 116.662 194.74 118.3 195.969C118.619 196.196 118.892 196.56 119.119 196.97C119.62 197.925 119.893 199.336 119.893 200.928Z"
          fill="#29213D"
        />
        <path
          d="M119.893 200.928C119.893 201.201 119.893 201.474 119.847 201.793C119.665 204.477 111.43 204.978 105.697 205.251C100.055 205.524 94.094 203.931 96.1415 202.066C97.37 202.794 100.055 203.658 105.651 203.431C113.295 203.112 117.936 201.838 119.893 200.928Z"
          fill="#534469"
        />
        <path
          d="M119.074 196.97C118.71 197.334 118.118 197.698 117.436 198.062C115.252 199.154 108.609 200.337 104.559 199.654C102.785 199.336 102.921 198.79 103.604 198.198C105.424 197.516 107.289 196.97 109.155 196.515C111.612 195.923 116.617 194.74 118.255 195.969C118.573 196.196 118.846 196.56 119.074 196.97Z"
          fill="#54466B"
        />
        <path
          d="M108.837 175.129C110.657 186.777 117.3 195.695 117.3 195.695C117.3 195.695 116.663 196.605 115.389 197.424C114.843 197.788 114.206 198.061 113.432 198.334C112.249 198.698 110.975 198.698 109.883 198.607C108.564 198.471 107.608 198.198 107.608 198.198C107.608 198.198 96.2788 183.592 94.8683 166.939C93.4578 150.286 102.421 141.914 102.421 141.914C102.421 141.914 102.512 141.869 102.603 141.778C103.513 141.186 107.517 139.002 112.34 141.732C112.704 141.914 113.023 142.142 113.296 142.324C116.981 144.735 117.527 147.192 117.527 147.192C117.527 147.192 115.025 149.376 113.159 152.652C111.294 155.837 107.017 163.481 108.837 175.129Z"
          fill="#443759"
        />
        <path
          d="M108.837 175.129C110.657 186.777 117.3 195.695 117.3 195.695C117.3 195.695 116.663 196.605 115.389 197.424C112.067 192.829 104.105 178.906 104.378 165.665C104.605 153.562 110.884 145.145 113.341 142.324C117.027 144.735 117.573 147.192 117.573 147.192C117.573 147.192 115.07 149.376 113.205 152.652C111.294 155.837 107.017 163.481 108.837 175.129Z"
          fill="#554371"
        />
        <path
          d="M109.837 198.562C108.518 198.425 107.562 198.152 107.562 198.152C107.562 198.152 96.2329 183.547 94.8224 166.894C93.4119 150.241 102.375 141.869 102.375 141.869C102.375 141.869 102.466 141.823 102.557 141.732C100.828 145.281 96.9609 154.472 97.3249 164.846C97.7799 178.178 103.558 188.461 107.608 195.013C108.381 196.332 109.155 197.515 109.837 198.562Z"
          fill="#4F3E6B"
        />
        <path
          d="M101.192 186.732C101.056 186.732 100.874 186.687 100.783 186.55C100.555 186.323 100.51 185.913 100.737 185.686C100.783 185.64 102.102 184.275 104.741 183.456C107.426 182.637 110.383 183.547 110.52 183.593C110.838 183.684 111.02 184.048 110.929 184.366C110.838 184.685 110.474 184.867 110.156 184.776C110.11 184.776 107.426 183.957 105.105 184.639C102.785 185.367 101.647 186.505 101.647 186.55C101.556 186.687 101.374 186.732 101.192 186.732Z"
          fill="#554371"
        />
        <path
          d="M96.506 172.172C96.2785 172.172 96.0964 172.081 95.9599 171.854C95.7779 171.535 95.8689 171.171 96.1874 170.989C96.2784 170.944 98.9629 169.397 102.011 169.26C105.105 169.078 107.699 170.853 107.79 170.944C108.063 171.126 108.154 171.535 107.926 171.808C107.744 172.081 107.335 172.172 107.062 171.945C107.016 171.945 104.741 170.352 102.057 170.489C99.2815 170.625 96.8244 172.036 96.7789 172.081C96.7334 172.172 96.597 172.172 96.506 172.172Z"
          fill="#554371"
        />
        <path
          d="M108.973 160.16C108.836 160.16 108.654 160.115 108.563 159.978C108.518 159.933 105.151 156.884 101.784 156.475C98.5079 156.065 96.5059 157.476 96.5059 157.521C96.2329 157.703 95.8234 157.658 95.6414 157.385C95.4594 157.112 95.5049 156.702 95.7779 156.52C95.8689 156.429 98.1894 154.746 101.966 155.246C105.697 155.747 109.246 158.932 109.428 159.068C109.701 159.296 109.701 159.705 109.473 159.933C109.291 160.069 109.109 160.16 108.973 160.16Z"
          fill="#554371"
        />
        <path
          d="M148.695 147.238C148.695 147.238 147.83 150.196 145.1 151.97C142.37 153.745 140.823 153.927 140.823 153.927C140.823 153.927 139.049 153.654 139.049 152.516C139.049 152.471 139.049 152.425 139.049 152.38C139.14 151.151 140.004 150.059 140.004 150.059C140.004 150.059 142.325 149.65 143.599 149.013C144.873 148.376 146.238 146.328 147.239 146.101C147.739 146.01 148.058 146.237 148.331 146.556C148.604 146.874 148.695 147.238 148.695 147.238Z"
          fill="#443759"
        />
        <path
          d="M148.695 147.238C148.695 147.238 147.83 150.196 145.1 151.97C142.37 153.745 140.823 153.927 140.823 153.927C140.823 153.927 139.049 153.654 139.049 152.516C140.277 152.425 143.189 152.061 145.237 150.423C146.92 149.104 147.876 147.511 148.331 146.51C148.604 146.874 148.695 147.238 148.695 147.238Z"
          fill="#554371"
        />
        <path
          d="M147.011 147.011C145.373 149.24 143.507 150.105 141.96 150.651C140.413 151.197 139.367 150.969 139.367 150.969C139.367 150.969 138.548 150.196 138.684 149.24C138.73 148.694 139.094 148.103 140.049 147.557C140.049 147.557 142.643 147.238 144.281 144.053C145.919 140.868 145.236 140.55 145.646 139.913C145.919 139.458 146.92 139.503 147.602 139.913C147.921 140.095 148.194 140.413 148.285 140.777C148.694 141.915 148.649 144.781 147.011 147.011Z"
          fill="#443759"
        />
        <path
          d="M147.011 147.011C145.373 149.24 143.507 150.105 141.96 150.651C140.413 151.197 139.367 150.969 139.367 150.969C139.367 150.969 138.548 150.196 138.684 149.24C140.368 149.149 143.826 148.694 145.509 146.192C147.193 143.735 147.557 141.141 147.602 139.913C147.921 140.095 148.194 140.413 148.285 140.777C148.694 141.915 148.649 144.781 147.011 147.011Z"
          fill="#554371"
        />
        <path
          d="M143.962 145.6C142.415 147.693 140.641 148.558 139.139 149.058C137.683 149.559 136.682 149.331 136.682 149.331C136.682 149.331 135.909 148.603 136.045 147.693C136.091 147.193 136.455 146.601 137.365 146.101C137.365 146.101 139.822 145.828 141.369 142.779C142.916 139.776 142.279 139.458 142.643 138.821C142.916 138.411 143.826 138.411 144.508 138.821C144.827 139.003 145.054 139.276 145.191 139.64C145.555 140.777 145.509 143.507 143.962 145.6Z"
          fill="#443759"
        />
        <path
          d="M143.962 145.6C142.415 147.693 140.641 148.558 139.139 149.058C137.683 149.559 136.682 149.331 136.682 149.331C136.682 149.331 135.909 148.603 136.045 147.693C137.638 147.602 140.914 147.193 142.552 144.827C144.144 142.506 144.463 140.049 144.554 138.866C144.872 139.048 145.1 139.321 145.236 139.685C145.555 140.777 145.509 143.507 143.962 145.6Z"
          fill="#554371"
        />
        <path
          d="M142.734 149.65C142.78 150.969 142.461 152.061 142.097 152.88C141.597 153.927 141.051 154.473 141.051 154.473C141.051 154.473 129.539 158.522 117.436 148.421C111.203 143.234 106.198 136.455 102.831 131.131C99.6457 126.081 97.8712 122.304 97.8712 122.304C97.8712 122.304 96.9157 119.347 98.6902 116.799C99.2362 115.98 100.055 115.206 101.329 114.569C103.468 113.477 105.242 113.386 106.653 113.75C109.019 114.342 110.338 116.116 110.338 116.116C110.338 116.116 112.113 120.029 114.752 124.852C117.846 130.449 122.123 137.274 126.218 140.459C133.816 146.374 140.141 144.099 140.141 144.099C140.141 144.099 140.823 144.781 141.506 145.828C142.006 146.783 142.689 148.148 142.734 149.65Z"
          fill="#443759"
        />
        <path
          d="M114.615 124.761C113.659 126.263 111.794 128.492 108.336 129.766C106.106 130.631 104.15 130.949 102.739 131.086C99.5544 126.035 97.7799 122.259 97.7799 122.259C97.7799 122.259 96.1419 117.117 101.192 114.478C106.88 111.521 110.201 116.025 110.201 116.025C110.201 116.025 111.976 119.984 114.615 124.761Z"
          fill="#554371"
        />
        <path
          d="M142.051 152.835C141.551 153.881 141.005 154.427 141.005 154.427C141.005 154.427 129.493 158.477 117.39 148.376C111.157 143.189 106.152 136.409 102.785 131.086C99.5998 126.035 97.8253 122.259 97.8253 122.259C97.8253 122.259 96.8698 119.301 98.6443 116.753C100.146 120.166 106.561 134.089 114.706 142.097C124.033 151.242 129.084 152.38 138.047 152.744C139.503 152.789 140.868 152.835 142.051 152.835Z"
          fill="#554371"
        />
        <path
          d="M141.369 145.782C139.049 146.465 135.818 146.965 132.451 145.919C126.172 143.962 121.031 140.004 115.98 132.405C111.84 126.126 107.836 116.844 106.562 113.705C108.928 114.296 110.247 116.071 110.247 116.071C110.247 116.071 112.022 119.984 114.661 124.807C117.755 130.403 122.032 137.228 126.127 140.413C133.725 146.328 140.05 144.053 140.05 144.053C140.05 144.053 140.687 144.69 141.369 145.782Z"
          fill="#4F3E6B"
        />
        <path
          d="M109.837 138.639C108.7 138.639 107.972 138.366 107.926 138.366C107.608 138.229 107.426 137.865 107.562 137.547C107.699 137.228 108.063 137.046 108.381 137.183C108.472 137.228 110.611 137.956 113.477 136.409C116.344 134.817 117.026 131.996 117.026 131.996C117.117 131.677 117.436 131.45 117.754 131.541C118.073 131.632 118.3 131.95 118.209 132.269C118.164 132.405 117.436 135.636 114.023 137.501C112.431 138.411 110.929 138.639 109.837 138.639Z"
          fill="#554371"
        />
        <path
          d="M118.528 148.831C118.164 148.831 117.891 148.558 117.891 148.194C117.891 147.83 118.164 147.557 118.528 147.557C118.573 147.557 121.394 147.511 122.987 145.555C124.625 143.553 124.306 140.732 124.306 140.686C124.261 140.322 124.534 140.049 124.852 140.004C125.171 139.958 125.489 140.231 125.535 140.55C125.535 140.686 125.899 143.917 123.942 146.328C121.986 148.831 118.664 148.831 118.528 148.831Z"
          fill="#554371"
        />
        <path
          d="M128.538 154.154C128.31 154.154 128.037 154.018 127.946 153.745C127.81 153.426 127.992 153.062 128.31 152.926C128.356 152.926 130.904 151.879 131.586 149.104C132.269 146.283 131.313 144.645 131.268 144.599C131.086 144.326 131.177 143.917 131.45 143.735C131.723 143.553 132.132 143.644 132.314 143.917C132.36 144.008 133.634 146.055 132.769 149.377C131.905 152.789 128.856 154.018 128.72 154.063C128.674 154.154 128.629 154.154 128.538 154.154Z"
          fill="#554371"
        />
        <path
          d="M114.979 119.301C114.979 119.301 114.888 119.847 114.569 120.666C113.932 122.213 112.431 124.761 109.018 126.991C103.74 130.403 99.0535 128.947 99.0535 128.947C99.0535 128.947 95.6865 124.534 95.004 118.437C94.5945 114.933 96.915 112.203 99.918 110.884C102.148 109.928 104.741 109.746 106.834 110.656C111.794 112.886 114.979 119.301 114.979 119.301Z"
          fill="#29213D"
        />
        <path
          d="M114.978 119.301C114.978 119.301 114.887 119.847 114.569 120.666C114.569 120.621 114.523 120.621 114.523 120.575C110.292 114.979 106.97 113.841 106.97 113.841C106.97 113.841 105.742 116.753 101.692 115.07C98.8713 113.932 99.3718 111.93 99.9633 110.884C102.193 109.928 104.786 109.746 106.879 110.656C111.793 112.886 114.978 119.301 114.978 119.301Z"
          fill="#534469"
        />
        <path
          d="M59.696 95.2314C58.8315 95.0949 58.0125 95.6409 57.8305 96.4599C57.421 98.1889 56.784 101.146 56.511 103.421C56.2835 105.332 56.1925 106.925 56.147 108.017C56.1015 108.79 56.693 109.518 57.4665 109.655C58.3765 109.791 59.1955 109.154 59.2865 108.244C59.3775 106.834 59.605 104.695 60.1055 102.238C60.5605 99.9179 60.879 98.2799 61.1065 97.1879C61.243 96.2779 60.606 95.4134 59.696 95.2314Z"
          fill="#29213D"
        />
        <path
          d="M51.8242 100.1C52.0517 99.1896 53.0072 98.6891 53.8717 99.0986C55.2367 99.6901 57.2387 100.555 59.1497 101.237C61.1062 101.92 62.9262 102.602 64.0637 103.057C64.8372 103.33 65.2467 104.149 65.0647 104.968C64.8372 105.833 63.9272 106.379 63.0627 106.106C61.5612 105.696 59.1952 104.923 56.6927 103.876C54.4632 102.921 53.1892 102.193 52.4157 101.738C51.9152 101.374 51.6877 100.737 51.8242 100.1Z"
          fill="#29213D"
        />
        <path
          d="M79.2609 84.1294C78.1689 83.9474 77.1224 84.6754 76.8494 85.7674C76.3489 88.0424 75.6209 91.8644 75.3024 94.8674C75.0749 97.3699 74.9384 99.4174 74.9384 100.828C74.8929 101.874 75.6664 102.739 76.6674 102.875C77.8504 103.057 78.8969 102.193 78.9879 101.01C79.0789 99.1899 79.3519 96.4144 79.8524 93.2294C80.3529 90.1809 80.7624 88.0424 80.9899 86.6319C81.2629 85.4489 80.4439 84.3114 79.2609 84.1294Z"
          fill="#29213D"
        />
        <path
          d="M69.1601 90.6815C69.4331 89.4985 70.7071 88.8615 71.7991 89.3165C73.5736 90.0445 76.1671 91.091 78.6696 91.9555C81.2176 92.82 83.5836 93.639 85.0851 94.185C86.0861 94.549 86.6776 95.5955 86.4046 96.642C86.1316 97.7795 84.9486 98.5075 83.8111 98.189C81.8546 97.6885 78.8061 96.7785 75.5301 95.459C72.6181 94.276 70.9346 93.366 69.9791 92.7745C69.3421 92.274 68.9781 91.455 69.1601 90.6815Z"
          fill="#29213D"
        />
        <path
          d="M233.278 171.08C233.278 171.08 235.599 171.763 237.282 173.719C238.966 175.721 239.193 178.952 239.193 178.952L248.384 174.675C248.384 174.675 243.743 176.449 242.196 173.355C240.649 170.261 245.791 165.347 245.791 165.347C245.791 165.347 240.103 169.988 237.874 169.306C235.644 168.623 235.28 165.848 235.28 165.848L233.278 171.08Z"
          fill="#554371"
        />
        <path
          d="M224.588 170.034L226.226 170.079L228.774 151.424L222.995 150.332L224.588 170.034Z"
          fill="#4E3C6B"
        />
        <path
          d="M228.592 170.124L232.414 152.652L237.919 155.337L229.593 170.579L228.592 170.124Z"
          fill="#4E3C6B"
        />
        <path
          d="M46.5003 81.9454L45.5448 84.0384L25.5703 77.8959L28.2548 70.0244L46.5003 81.9454Z"
          fill="#554371"
        />
        <path
          d="M49.5036 75.0296L47.7291 77.5776L25.1611 60.3786L31.3946 53.8721L49.5036 75.0296Z"
          fill="#554371"
        />
      </svg>
      <h4>{label ? label : "По вашему запросу ничего не найдено :("}</h4>
    </div>
  );
};
