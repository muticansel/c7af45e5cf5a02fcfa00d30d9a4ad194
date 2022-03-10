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
} from "@mui/material";
import ProductDetail from "./ProductDetail";
import { dummyProducts } from "../data/dummy";

const createData = (id, itemName, price) => {
  return { id, itemName, price };
};

const prods = dummyProducts.slice(0, 15).map((product) => {
  return createData(product.id, product.title, product.variants[0].price);
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
      // const response = await fetch(
      //   `https://teknasyon.myshopify.com/admin/api/2022-01/products.json`,
      //   {
      //     mode: "cors",
      //     headers: {
      //       'X-Shopify-Access-Token': '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',
      //       "Access-Control-Allow-Origin": "*"
      //     }
      //   }
      // );
      // const data = await response.json();
      // setProducts(data.products);
      // setDataLength(data.products.length);
      setProducts(prods);
      setDataLength(prods.length);
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
    const getHashDetail = async () => {
      setOpenModal(true);
      const product = filteredData.find(
        (product) => product.itemName === selectedProduct
      );
      setProductDetail(product);
    };
    if (selectedProduct) getHashDetail();
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
    setSelectedProduct(productName);
  };

  // Creates rows
  const renderData = () => {
    const filteredProducts = filteredData.map((row) => {
      return (
        <TableRow
          key={row.itemName}
          onClick={() => getProductDetail(row.itemName)}
        >
          <TableCell>{row.itemName}</TableCell>
          <TableCell>{row.price}</TableCell>
        </TableRow>
      );
    });

    return filteredProducts;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Price</TableCell>
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
  );
};

export default LandingPage;
