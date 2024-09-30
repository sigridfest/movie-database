import { Button, styled } from "@mui/material";
const StyledButton = styled(Button)({
    fontSize: 12,
    textTransform: 'none',
    width: 120,
    padding: '5px 10px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#504B3A',
    borderColor: '#474233',

    '&:hover': {
        backgroundColor: '#3B372B',
        borderColor: '#2F2C22',
        boxShadow: 'none',
      },
})
export default StyledButton;