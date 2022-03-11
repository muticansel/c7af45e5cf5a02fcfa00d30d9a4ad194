import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ProductDetail from "./ProductDetail";
import IconSearch from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
  }
});

const LandingPage = () => {
  const [dataLength, setDataLength] = useState(15);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://teknasyon.netlify.app/.netlify/functions/products`,
        {
          mode: "cors",
          headers: {
            "X-Access-Token": "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",
          },
        }
      );
      const data = await response.json();
      setProducts(data.products);
      setDataLength(data.products.length);
    };

    getData();
  }, []);

  useEffect(() => {
    // Filters the data according to the 'page' and 'rowsPerPage'
    const filterData = () => {
      const startIndex = rowsPerPage * page;
      const filteredData = products.slice(startIndex, startIndex + rowsPerPage);
      setFilteredData(filteredData);
    };

    filterData();
  }, [products, page, rowsPerPage]);

  // When a row is selected
  useEffect(() => {
    const getProductDetail = async () => {
      const product = filteredData.find(
        (product) => product.itemName === selectedProduct
      );
      setProductDetail(product);
    };
    if (selectedProduct) getProductDetail();
  }, [selectedProduct, filteredData]);

  // Sets the 'page' and the data
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Sets the 'rowsPerPage'
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Closes the modal of block detail
  const closeModal = () => {
    setOpenModal(false);
    setProductDetail(null);
  };

  // Gets
  const getProductDetail = (productName) => {
    setOpenModal(true);
    setSelectedProduct(productName);
  };

  // Creates rows
  const renderData = () => {
    const filteredProducts = filteredData.map((row) => {
      return (
        <StyledTableRow
          key={row.id}
          onClick={() => getProductDetail(row.title)}
        >
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.variants[0].price}</TableCell>
        </StyledTableRow>
      );
    });

    return filteredProducts;
  };

  const searchHandler = (searchText) => {
    const filterData = async () => {
      const filteredSearchData = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      await setFilteredData(filteredSearchData);
      await setDataLength(filteredSearchData.length);
    };

    filterData();
  };

  return (
    <div style={{ padding: "15px" }}>
      <div style={{ marginBottom: "60px", float: 'left' }}>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
          }}
          id="outlined-basic"
          label="Item Name"
          variant="outlined"
          placeholder="Search Item Name"
          onChange={(e) => searchHandler(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderData()}</TableBody>
        </Table>
        <TablePagination
          component="div"
          count={dataLength}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <ProductDetail
          open={openModal}
          handleClose={closeModal}
          productDetail={productDetail}
        />
      </TableContainer>
    </div>
  );
};

export default LandingPage;
