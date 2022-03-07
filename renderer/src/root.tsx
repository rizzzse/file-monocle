import { css } from "@linaria/core";
import { StrictMode, useEffect, useState, VFC } from "react";

css`
    ${":global()"} {
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
    }
`;

const Cwd: VFC = () => {
    const [cwd, setCwd] = useState("");

    useEffect(() => {
        setCwd(process.cwd());
    }, []);

    return <p>{cwd}</p>;
};

export const root = (
    <StrictMode>
        <Cwd />
    </StrictMode>
);
