import React from "react";
import IVCOPage from "./IVCOPage";
import { Container } from "@mui/material";
import { BLACK_TIE_DIGITAL_PRESALE_ID } from "../../config";
import { styled } from "@mui/material";

const BlackContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.background.default};
  padding-bottom: 20px;
`;

const StyledContainer = styled(Container)``;

const Presale = ({
  handleConnectWalletModalOpen,
}: {
  handleConnectWalletModalOpen: () => void;
}) => {
  return (
    <BlackContainer>
      <StyledContainer>
        <IVCOPage
          id={BLACK_TIE_DIGITAL_PRESALE_ID}
          handleConnectWalletModalOpen={handleConnectWalletModalOpen}
        />
      </StyledContainer>
    </BlackContainer>
  );
};

export default Presale;
