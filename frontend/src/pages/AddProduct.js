import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "",
  });

  const [errors, setErrors] = useState({});

  const [requestError, setRequestError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { sku, name, price, productType } = formData;

    if (sku?.length === 0) {
      if (!errors?.isSkuEmpty) {
        setErrors((prev) => {
          return {
            ...prev,
            isSkuEmpty: true,
          };
        });
      }
    }
    if (name?.length === 0) {
      if (!errors?.isNameEmpty) {
        setErrors((prev) => {
          return {
            ...prev,
            isNameEmpty: true,
          };
        });
      }
    }
    if (!price || price?.length === 0) {
      if (!errors?.isPriceEmpty) {
        setErrors((prev) => {
          return {
            ...prev,
            isPriceEmpty: true,
          };
        });
      }
    }

    if (price && isNaN(price)) {
      if (!errors?.isPriceNotNumber) {
        setErrors((prev) => {
          return {
            ...prev,
            isPriceNotNumber: true,
          };
        });
      }
    }

    if (price && price < 0) {
      if (!errors?.isPriceNegative) {
        setErrors((prev) => {
          return {
            ...prev,
            isPriceNegative: true,
          };
        });
      }
    }

    if (!productType || productType?.length === 0) {
      if (!errors?.isProductTypeEmpty) {
        setErrors((prev) => {
          return {
            ...prev,
            isProductTypeEmpty: true,
          };
        });
      }
    }

    if (productType && productType?.toLowerCase() === "dvd") {
      if (
        !formData?.size ||
        formData?.size === 0 ||
        formData?.size?.length === 0
      ) {
        if (!errors?.isSizeEmpty) {
          setErrors((prev) => {
            return {
              ...prev,
              isSizeEmpty: true,
            };
          });
        }
      }
      if (formData?.size && isNaN(formData?.size)) {
        if (!errors?.isSizeNotNumber) {
          setErrors((prev) => {
            return {
              ...prev,
              isSizeNotNumber: true,
            };
          });
        }
      }
      if (formData?.size && formData?.size < 0) {
        if (!errors?.isSizeNegative) {
          setErrors((prev) => {
            return {
              ...prev,
              isSizeNegative: true,
            };
          });
        }
      }
    }

    if (productType && productType?.toLowerCase() === "book") {
      if (
        !formData?.weight ||
        formData?.weight === 0 ||
        formData?.weight?.length === 0
      ) {
        if (!errors?.isWeightEmpty) {
          setErrors((prev) => {
            return {
              ...prev,
              isWeightEmpty: true,
            };
          });
        }
      }
      if (formData?.weight && isNaN(formData?.weight)) {
        if (!errors?.isWeightNotNumber) {
          setErrors((prev) => {
            return {
              ...prev,
              isWeightNotNumber: true,
            };
          });
        }
      }
      if (formData?.weight && formData?.weight < 0) {
        if (!errors?.isWeightNegative) {
          setErrors((prev) => {
            return {
              ...prev,
              isWeightNegative: true,
            };
          });
        }
      }
    }

    if (productType && productType?.toLowerCase() === "furniture") {
      if (
        !formData?.height ||
        formData?.height === 0 ||
        formData?.height?.length === 0
      ) {
        if (!errors?.isHeightEmpty) {
          setErrors((prev) => {
            return {
              ...prev,
              isHeightEmpty: true,
            };
          });
        }
      }

      if (formData?.height && isNaN(formData?.height)) {
        if (!errors?.isHeightNotNumber) {
          setErrors((prev) => {
            return {
              ...prev,
              isHeightNotNumber: true,
            };
          });
        }
      }

      if (formData?.height && formData?.height < 0) {
        if (!errors?.isHeightNegative) {
          setErrors((prev) => {
            return {
              ...prev,
              isHeightNegative: true,
            };
          });
        }
      }

      if (
        !formData?.width ||
        formData?.width === 0 ||
        formData?.width?.length === 0
      ) {
        if (!errors?.isWidthEmpty) {
          setErrors((prev) => {
            return {
              ...prev,
              isWidthEmpty: true,
            };
          });
        }
      }

      if (formData?.width && isNaN(formData?.width)) {
        if (!errors?.isWidthNotNumber) {
          setErrors((prev) => {
            return {
              ...prev,
              isWidthNotNumber: true,
            };
          });
        }
      }

      if (formData?.width && formData?.width < 0) {
        if (!errors?.isWidthNegative) {
          setErrors((prev) => {
            return {
              ...prev,
              isWidthNegative: true,
            };
          });
        }
      }

      if (
        !formData?.length ||
        formData?.length === 0 ||
        formData?.length?.length === 0
      ) {
        if (!errors?.isLengthEmpty) {
          setErrors((prev) => {
            return {
              ...prev,
              isLengthEmpty: true,
            };
          });
        }
      }

      if (formData?.length && isNaN(formData?.length)) {
        if (!errors?.isLengthNotNumber) {
          setErrors((prev) => {
            return {
              ...prev,
              isLengthNotNumber: true,
            };
          });
        }
      }

      if (formData?.length && formData?.length < 0) {
        if (!errors?.isLengthNegative) {
          setErrors((prev) => {
            return {
              ...prev,
              isLengthNegative: true,
            };
          });
        }
      }
    }

    if (
      formData?.sku?.trim()?.length === 0 ||
      formData?.name?.trim()?.length === 0 ||
      formData?.price <= 0 ||
      formData?.productType?.trim()?.length === 0 ||
      formData?.productType?.trim()?.toLowerCase() === "type swticher" ||
      (formData?.productType?.toLowerCase() === "dvd" && formData?.size <= 0) ||
      (formData?.productType?.toLowerCase() === "book" &&
        formData?.weight <= 0) ||
      (formData?.productType?.toLowerCase() === "furniture" &&
        formData?.height <= 0) ||
      formData?.width <= 0 ||
      formData?.length <= 0 ||
      Object.keys(errors).length > 0
    ) {
      return;
    }

    if (
      formData?.sku?.trim()?.length > 0 &&
      formData?.name?.trim()?.length > 0 &&
      formData?.price > 0 &&
      formData?.productType?.trim()?.length > 0 &&
      formData?.productType?.trim()?.toLowerCase() !== "type swticher" &&
      ((formData?.productType?.toLowerCase() === "dvd" && formData?.size > 0) ||
        (formData?.productType?.toLowerCase() === "book" &&
          formData?.weight > 0) ||
        (formData?.productType?.toLowerCase() === "furniture" &&
          formData?.height > 0 &&
          formData?.width > 0 &&
          formData?.length > 0)) &&
      Object.keys(errors).length === 0
    ) {
      try {
        const { data } = await axios.post(
          "/products/add",
          JSON.stringify(formData)
        );
        console.log(data);
        if (data?.status === "success") {
          navigate("/");
        }
      } catch (error) {
        setRequestError(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Add Product | Scandiweb Test Task";
    return () => {
      document.title = "Scandiweb Test Task";
    };
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center p-4 border-bottom border-2 border-dark justify-content-between"
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
        }}
      >
        <h2>Product Add</h2>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              marginRight: "10px",
              outline: "none",
              border: "none",
              cursor: Object.keys(errors).length > 0 && "not-allowed",
              backgroundColor: Object.keys(errors).length > 0 && "#828282",
              userSelect: Object.keys(errors).length > 0 && "none",
            }}
            disabled={Object.keys(errors).length > 0}
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="container p-4">
        {requestError && requestError?.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {requestError}
          </div>
        )}
        <form method="post" id="product_form">
          <div className="row mb-3 g-3">
            <div className="col-sm-2 col-lg-1">
              <label htmlFor="sku" className="col-form-label">
                SKU
              </label>
            </div>
            <div className="col-sm-auto">
              <input
                required
                type="text"
                id="sku"
                name="sku"
                className="form-control"
                style={{
                  boxShadow: "none",
                  outline: "none",
                  borderColor: errors?.isSkuEmpty && "red",
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length > 0) {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        sku: value?.trim(),
                      };
                    });
                    if (errors?.isSkuEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isSkuEmpty;
                      setErrors(newErrors);
                    }
                  } else {
                    if (!errors?.isSkuEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isSkuEmpty: true,
                        };
                      });
                    }
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length === 0) {
                    if (!errors?.isSkuEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isSkuEmpty: true,
                        };
                      });
                    }
                  } else {
                    if (errors?.isSkuEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isSkuEmpty;
                      setErrors(newErrors);
                    }
                  }
                }}
              />
              {errors?.isSkuEmpty && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  SKU is required, please fill it out!
                </span>
              )}
            </div>
            <div className="col-sm-auto">
              <span className="form-text">
                SKU must be unique and different from other products skus on
                this website.
              </span>
            </div>
          </div>
          <div className="row mb-3 g-3">
            <div className="col-sm-2 col-lg-1">
              <label htmlFor="name" className="col-form-label">
                Name
              </label>
            </div>
            <div className="col-sm-auto">
              <input
                required
                type="text"
                id="name"
                name="name"
                className="form-control"
                style={{
                  boxShadow: "none",
                  outline: "none",
                  borderColor: errors?.isNameEmpty && "red",
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length > 0) {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        name: value?.trim(),
                      };
                    });
                    if (errors?.isNameEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isNameEmpty;
                      setErrors(newErrors);
                    }
                  } else {
                    if (!errors?.isNameEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isNameEmpty: true,
                        };
                      });
                    }
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length === 0) {
                    if (!errors?.isNameEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isNameEmpty: true,
                        };
                      });
                    }
                  } else {
                    if (errors?.isNameEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isNameEmpty;
                      setErrors(newErrors);
                    }
                  }
                }}
              />
              {errors?.isNameEmpty && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Name is required, please fill it out!
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3 g-3">
            <div className="col-sm-2 col-lg-1">
              <label htmlFor="price" className="col-form-label">
                Price ($)
              </label>
            </div>
            <div className="col-sm-auto">
              <input
                required
                type="number"
                id="price"
                name="price"
                min={1}
                step={0.01}
                className="form-control"
                style={{
                  boxShadow: "none",
                  outline: "none",
                  borderColor:
                    (errors?.isPriceEmpty ||
                      errors?.isPriceNotNumber ||
                      errors?.isPriceNegative) &&
                    "red",
                  color:
                    errors?.isPriceEmpty ||
                    errors?.isPriceNotNumber ||
                    errors?.isPriceNegative
                      ? "red"
                      : "black",
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length > 0) {
                    if (errors?.isPriceEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceEmpty;
                      setErrors(newErrors);
                    }
                    if (isNaN(value?.trim())) {
                      if (!errors?.isPriceNotNumber) {
                        setErrors((prev) => {
                          return {
                            ...prev,
                            isPriceNotNumber: true,
                          };
                        });
                        return;
                      }
                    } else {
                      if (errors?.isPriceNotNumber) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNotNumber;
                        setErrors(newErrors);
                      }
                    }
                    if (value?.trim() < 0) {
                      if (!errors?.isPriceNegative) {
                        setErrors((prev) => {
                          return {
                            ...prev,
                            isPriceNegative: true,
                          };
                        });
                        return;
                      }
                    } else {
                      if (errors?.isPriceNegative) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNegative;
                        setErrors(newErrors);
                      }
                    }
                    if (!isNaN(value?.trim()) && Number(value?.trim()) > 0) {
                      const price = parseFloat(value?.trim());
                      setFormData((prev) => {
                        return {
                          ...prev,
                          price,
                        };
                      });
                      if (errors?.isPriceNotNumber) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNotNumber;
                        setErrors(newErrors);
                      }
                      if (errors?.isPriceNegative) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNegative;
                        setErrors(newErrors);
                      }
                    }
                  } else {
                    if (errors?.isPriceNotNumber) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceNotNumber;
                      setErrors(newErrors);
                    }
                    if (errors?.isPriceNegative) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceNegative;
                      setErrors(newErrors);
                    }
                    if (!errors?.isPriceEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isPriceEmpty: true,
                        };
                      });
                    }
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value;
                  if (value?.trim()?.length > 0) {
                    if (errors?.isPriceEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceEmpty;
                      setErrors(newErrors);
                    }
                    if (isNaN(value?.trim())) {
                      if (!errors?.isPriceNotNumber) {
                        setErrors((prev) => {
                          return {
                            ...prev,
                            isPriceNotNumber: true,
                          };
                        });
                        return;
                      }
                    } else {
                      if (errors?.isPriceNotNumber) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNotNumber;
                        setErrors(newErrors);
                      }
                    }
                    if (value?.trim() < 0) {
                      if (!errors?.isPriceNegative) {
                        setErrors((prev) => {
                          return {
                            ...prev,
                            isPriceNegative: true,
                          };
                        });
                        return;
                      }
                    } else {
                      if (errors?.isPriceNegative) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNegative;
                        setErrors(newErrors);
                      }
                    }
                    if (!isNaN(value?.trim()) && Number(value?.trim()) > 0) {
                      if (errors?.isPriceNotNumber) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNotNumber;
                        setErrors(newErrors);
                      }
                      if (errors?.isPriceNegative) {
                        const newErrors = { ...errors };
                        delete newErrors.isPriceNegative;
                        setErrors(newErrors);
                      }
                    }
                  } else {
                    if (errors?.isPriceNotNumber) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceNotNumber;
                      setErrors(newErrors);
                    }
                    if (errors?.isPriceNegative) {
                      const newErrors = { ...errors };
                      delete newErrors.isPriceNegative;
                      setErrors(newErrors);
                    }
                    if (!errors?.isPriceEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isPriceEmpty: true,
                        };
                      });
                    }
                  }
                }}
              />
              {errors?.isPriceEmpty && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Price is required, please fill it out!
                </span>
              )}
              {errors?.isPriceNotNumber && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Price must be a number!
                </span>
              )}
              {errors?.isPriceNegative && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Price must be greater than 0!
                </span>
              )}
            </div>
            <div className="col-sm-auto">
              <span className="form-text">
                Price must be positive and can have up to 2 decimal places.
              </span>
            </div>
          </div>
          <div className="row mb-3 g-3">
            <div className="col-sm-2 col-lg-1">
              <label htmlFor="price" className="col-form-label">
                Product Type
              </label>
            </div>
            <div className="col-sm-auto">
              <select
                name="productType"
                className="form-select"
                id="productType"
                defaultValue="Type Swticher"
                style={{
                  boxShadow: "none",
                  outline: "none",
                  borderColor: errors?.isProductTypeEmpty && "red",
                  color: errors?.isProductTypeEmpty ? "red" : "black",
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value !== "Type Swticher") {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        productType: value,
                      };
                    });
                    if (errors?.isProductTypeEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isProductTypeEmpty;
                      setErrors(newErrors);
                    }
                  } else {
                    if (!errors?.isProductTypeEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isProductTypeEmpty: true,
                        };
                      });
                    }
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value;
                  if (value === "Type Swticher") {
                    if (!errors?.isProductTypeEmpty) {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          isProductTypeEmpty: true,
                        };
                      });
                    }
                  } else {
                    if (errors?.isProductTypeEmpty) {
                      const newErrors = { ...errors };
                      delete newErrors.isProductTypeEmpty;
                      setErrors(newErrors);
                    }
                  }
                }}
              >
                <option disabled value="Type Swticher">
                  Type Swticher
                </option>
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </select>
              {errors?.isProductTypeEmpty && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Product Type is required, please pick one!
                </span>
              )}
            </div>
          </div>
          {formData?.productType?.toLowerCase() === "dvd" && (
            <>
              <div className="row mb-3 g-3">
                <h5>Please fill out the DVD size:</h5>
              </div>
              <div className="row mb-3 g-3">
                <div className="col-sm-2 col-lg-1">
                  <label htmlFor="name" className="col-form-label">
                    Size (MB)
                  </label>
                </div>
                <div className="col-sm-auto">
                  <input
                    required
                    type="number"
                    id="size"
                    name="size"
                    min={1}
                    step={0.01}
                    className="form-control"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor:
                        (errors?.isSizeEmpty ||
                          errors?.isSizeNotNumber ||
                          errors?.isSizeNegative) &&
                        "red",
                      color:
                        errors?.isSizeEmpty ||
                        errors?.isSizeNotNumber ||
                        errors?.isSizeNegative
                          ? "red"
                          : "black",
                    }}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isSizeEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isSizeNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isSizeNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isSizeNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isSizeNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isSizeNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isSizeNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          const size = parseFloat(value?.trim());
                          setFormData((prev) => {
                            return {
                              ...prev,
                              size,
                            };
                          });
                          if (errors?.isSizeNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isSizeNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isSizeNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isSizeNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isSizeEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isSizeEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isSizeEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isSizeNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isSizeNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isSizeNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isSizeNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isSizeNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isSizeNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          if (errors?.isSizeNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isSizeNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isSizeNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isSizeNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isSizeNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isSizeNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isSizeEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isSizeEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                  />
                  {errors?.isSizeEmpty && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Size is required, please fill it out!
                    </span>
                  )}
                  {errors?.isSizeNotNumber && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Size must be a number!
                    </span>
                  )}
                  {errors?.isSizeNegative && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Size must be greater than 0!
                    </span>
                  )}
                </div>
                <div className="col-sm-auto">
                  <span className="form-text">
                    Size must be positive and can have up to 2 decimal places.
                  </span>
                </div>
              </div>
            </>
          )}
          {formData?.productType?.toLowerCase() === "book" && (
            <>
              <div className="row mb-3 g-3">
                <h5>Please fill out the Book weight:</h5>
              </div>
              <div className="row mb-3 g-3">
                <div className="col-sm-2 col-lg-1">
                  <label htmlFor="name" className="col-form-label">
                    Weight (KG)
                  </label>
                </div>
                <div className="col-sm-auto">
                  <input
                    required
                    type="number"
                    id="weight"
                    name="weight"
                    min={1}
                    step={0.01}
                    className="form-control"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor:
                        (errors?.isWeightEmpty ||
                          errors?.isWeightNotNumber ||
                          errors?.isWeightNegative) &&
                        "red",
                      color:
                        errors?.isWeightEmpty ||
                        errors?.isWeightNotNumber ||
                        errors?.isWeightNegative
                          ? "red"
                          : "black",
                    }}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isWeightEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isWeightNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWeightNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isWeightNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWeightNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          const weight = parseFloat(value?.trim());
                          setFormData((prev) => {
                            return {
                              ...prev,
                              weight,
                            };
                          });
                          if (errors?.isWeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isWeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isWeightNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isWeightNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isWeightEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isWeightEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isWeightEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isWeightNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWeightNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isWeightNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWeightNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          if (errors?.isWeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isWeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWeightNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isWeightNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isWeightNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isWeightNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isWeightEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isWeightEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                  />
                  {errors?.isWeightEmpty && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Weight is required, please fill it out!
                    </span>
                  )}
                  {errors?.isWeightNotNumber && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Weight must be a number!
                    </span>
                  )}
                  {errors?.isWeightNegative && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Weight must be a positive number!
                    </span>
                  )}
                </div>
                <div className="col-sm-auto">
                  <span className="form-text">
                    Weight must be positive and can have up to 2 decimal places.
                  </span>
                </div>
              </div>
            </>
          )}
          {formData?.productType?.toLowerCase() === "furniture" && (
            <>
              <div className="row mb-3 g-3">
                <h5>Please fill out the Furniture dimensions:</h5>
              </div>
              <div className="row mb-3 g-3">
                <div className="col-sm-2 col-lg-1">
                  <label htmlFor="name" className="col-form-label">
                    Height (CM)
                  </label>
                </div>
                <div className="col-sm-auto">
                  <input
                    required
                    type="number"
                    id="height"
                    name="height"
                    min={1}
                    step={0.01}
                    className="form-control"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor:
                        (errors?.isHeightEmpty ||
                          errors?.isHeightNotNumber ||
                          errors?.isHeightNegative) &&
                        "red",
                      color:
                        errors?.isHeightEmpty ||
                        errors?.isHeightNotNumber ||
                        errors?.isHeightNegative
                          ? "red"
                          : "black",
                    }}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isHeightEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isHeightNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isHeightNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isHeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isHeightNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isHeightNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isHeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          const height = parseFloat(value?.trim());
                          setFormData((prev) => {
                            return {
                              ...prev,
                              height,
                            };
                          });
                          if (errors?.isHeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isHeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isHeightNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isHeightNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isHeightEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isHeightEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isHeightEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isHeightNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isHeightNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isHeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isHeightNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isHeightNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isHeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          if (errors?.isHeightNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isHeightNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isHeightNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isHeightNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isHeightNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isHeightNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isHeightEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isHeightEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                  />
                  {errors?.isHeightEmpty && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Height is required, please fill it out!
                    </span>
                  )}
                  {errors?.isHeightNegative && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Height must be positive!
                    </span>
                  )}
                  {errors?.isHeightNotNumber && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Height must be a number!
                    </span>
                  )}
                </div>
                <div className="col-sm-auto">
                  <span className="form-text">
                    Height must be positive and can have up to 2 decimal places.
                  </span>
                </div>
              </div>
              <div className="row mb-3 g-3">
                <div className="col-sm-2 col-lg-1">
                  <label htmlFor="name" className="col-form-label">
                    Width (CM)
                  </label>
                </div>
                <div className="col-sm-auto">
                  <input
                    required
                    type="number"
                    id="width"
                    name="width"
                    min={1}
                    step={0.01}
                    className="form-control"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor:
                        (errors?.isWidthEmpty ||
                          errors?.isWidthNotNumber ||
                          errors?.isWidthNegative) &&
                        "red",
                      color:
                        errors?.isWidthEmpty ||
                        errors?.isWidthNotNumber ||
                        errors?.isWidthNegative
                          ? "red"
                          : "black",
                    }}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isWidthEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isWidthNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWidthNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWidthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isWidthNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWidthNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWidthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          const width = parseFloat(value?.trim());
                          setFormData((prev) => {
                            return {
                              ...prev,
                              width,
                            };
                          });
                          if (errors?.isWidthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isWidthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isWidthNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isWidthNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isWidthEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isWidthEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isWidthEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isWidthNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWidthNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWidthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isWidthNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isWidthNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isWidthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          if (errors?.isWidthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isWidthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isWidthNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isWidthNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isWidthNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isWidthNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isWidthEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isWidthEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                  />
                  {errors?.isWidthEmpty && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Width is required, please fill it out!
                    </span>
                  )}
                  {errors?.isWidthNotNumber && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Width must be a number!
                    </span>
                  )}
                  {errors?.isWidthNegative && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Width must be greater than 0!
                    </span>
                  )}
                </div>
                <div className="col-sm-auto">
                  <span className="form-text">
                    Width must be positive and can have up to 2 decimal places.
                  </span>
                </div>
              </div>
              <div className="row mb-3 g-3">
                <div className="col-sm-2 col-lg-1">
                  <label htmlFor="name" className="col-form-label">
                    Length (CM)
                  </label>
                </div>
                <div className="col-sm-auto">
                  <input
                    required
                    type="number"
                    id="length"
                    name="length"
                    min={1}
                    step={0.01}
                    className="form-control"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor:
                        (errors?.isLengthEmpty ||
                          errors?.isLengthNotNumber ||
                          errors?.isLengthNegative) &&
                        "red",
                      color:
                        errors?.isLengthEmpty ||
                        errors?.isLengthNotNumber ||
                        errors?.isLengthNegative
                          ? "red"
                          : "black",
                    }}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isLengthEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isLengthNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isLengthNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isLengthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isLengthNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isLengthNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isLengthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          const length = parseFloat(value?.trim());
                          setFormData((prev) => {
                            return {
                              ...prev,
                              length,
                            };
                          });
                          if (errors?.isLengthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isLengthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isLengthNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isLengthNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isLengthEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isLengthEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (value?.trim()?.length > 0) {
                        if (errors?.isLengthEmpty) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthEmpty;
                          setErrors(newErrors);
                        }
                        if (isNaN(value?.trim())) {
                          if (!errors?.isLengthNotNumber) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isLengthNotNumber: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isLengthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNotNumber;
                            setErrors(newErrors);
                          }
                        }
                        if (value?.trim() < 0) {
                          if (!errors?.isLengthNegative) {
                            setErrors((prev) => {
                              return {
                                ...prev,
                                isLengthNegative: true,
                              };
                            });
                            return;
                          }
                        } else {
                          if (errors?.isLengthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNegative;
                            setErrors(newErrors);
                          }
                        }
                        if (
                          !isNaN(value?.trim()) &&
                          Number(value?.trim()) > 0
                        ) {
                          if (errors?.isLengthNotNumber) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNotNumber;
                            setErrors(newErrors);
                          }
                          if (errors?.isLengthNegative) {
                            const newErrors = { ...errors };
                            delete newErrors.isLengthNegative;
                            setErrors(newErrors);
                          }
                        }
                      } else {
                        if (errors?.isLengthNotNumber) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthNotNumber;
                          setErrors(newErrors);
                        }
                        if (errors?.isLengthNegative) {
                          const newErrors = { ...errors };
                          delete newErrors.isLengthNegative;
                          setErrors(newErrors);
                        }
                        if (!errors?.isLengthEmpty) {
                          setErrors((prev) => {
                            return {
                              ...prev,
                              isLengthEmpty: true,
                            };
                          });
                        }
                      }
                    }}
                  />
                  {errors?.isLengthEmpty && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Length is required, please fill it out!
                    </span>
                  )}
                  {errors?.isLengthNotNumber && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Length must be a number!
                    </span>
                  )}
                  {errors?.isLengthNegative && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Length must be greater than 0!
                    </span>
                  )}
                </div>
                <div className="col-sm-auto">
                  <span className="form-text">
                    Length must be positive and can have up to 2 decimal places.
                  </span>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
