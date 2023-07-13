/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const colors = {
    primary: "rgb(33, 150, 243)",
    danger: "rgb(244, 67, 54)",
    success: "rgb(76, 175, 80)",
    warning: "rgb(255, 193, 7)",
};

const colorSuccess = css`
    color: ${colors.success};
`;
const colorDanger = css`
    color: ${colors.danger};
`;

export { colorSuccess, colorDanger };

export default colors;
