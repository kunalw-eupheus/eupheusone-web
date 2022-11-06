import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import SwipeableTemporaryDrawer from '../../Components/Material/MaterialSidebar'
import BasicButton from '../../Components/Material/Button'
// import SearchDropDown from "../../Components/SearchDropDown";
import instance from '../../Instance'
import Cookies from 'js-cookie'
import {
  Autocomplete,
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from '@mui/material'
import RowRadioButtonsGroup from '../../Components/Material/RowRadioButtonGroup'
import BasicTextFields from '../../Components/Material/TextField'
import { useFormik } from 'formik'
import Snackbars from '../../Components/Material/SnackBar'
import SearchDropDown from '../../Components/SearchDropDown'

const UpdateFees = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fees, setFees] = useState({ fk_tution_fee: { fees: '' } })
  const [allfees, setAllFees] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true)

  const sidebarRef = useRef()
  const { id } = useParams()
  const show = null
  const snackbarRef = useRef()

  const formik = useFormik({
    initialValues: {
      tution_fees: '',
    },
    validate: () => {
      const errors = {}

      return errors
    },
    onSubmit: async (values) => {
      //   console.log(values);
      if (!values.tution_fees) {
        setSnackbarErrStatus(true)
        setErrMessage('Please Select Fees')
        snackbarRef.current.openSnackbar()
      } else {
        setLoading(true)
        const res = await instance({
          url: `school/kys/tutionfees/${id}/update`,
          method: 'PUT',
          data: {
            tution_fees: values.tution_fees,
          },
          headers: {
            Authorization: `${Cookies.get('accessToken')}`,
          },
        })
        console.log(res)
        if (res.data.status === 'success') {
          setSnackbarErrStatus(false)
          setErrMessage(res.data.message)
          snackbarRef.current.openSnackbar()
          setTimeout(() => {
            window.scroll({
              top: 0,
              // behavior: "smooth",
            })
            setTimeout(() => {
              window.location.reload()
            }, 100)
          }, 1500)
        } else {
          setSnackbarErrStatus(true)
          setErrMessage(res.data.message)
          snackbarRef.current.openSnackbar()
        }
        setLoading(false)
      }
      //   console.log(res.data);
    },
  })

  const navInfo = {
    title: 'Tution Fees',
    details: ['Home', '/Tution Fees'],
  }

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar()
  }

  useLayoutEffect(() => {
    const getFees = async () => {
      const fees = await instance({
        url: `school/kys/tutionfees/${id}`,
        method: 'GET',
        headers: {
          Authorization: `${Cookies.get('accessToken')}`,
        },
      })
      setFees(fees.data.message)
    }
    const getAllFees = async () => {
      const Allfees = await instance({
        url: `school/kys/getall/tutionfees`,
        method: 'GET',
        headers: {
          Authorization: `${Cookies.get('accessToken')}`,
        },
      })
      // setFees(fees.data.message);
      setAllFees(Allfees.data.message)
    }
    getFees()
    getAllFees()
  }, [])

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case 'fees':
        formik.values.tution_fees = value.id
        break

      default:
        break
    }
  }

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false)
      } else {
        setSidebarCollapsed(true)
      }
    }
    window.addEventListener('resize', handleWidth)
    handleWidth()
    window.scroll(0, 0)

    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])
  return (
    <>
      <div className='flex w-[100%] min-h-[100vh]'>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <Sidebar
          highLight={''}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={''}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : 'md:ml-[30vw] ml-[85vw]'
          } `}
        >
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className='min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]'>
            <div className='text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute top-[2rem]'>
              <h1>Update Tution Fees</h1>
            </div>
            <div className='text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute top-[4rem]'>
              <h1>Current Fees: {fees?.fk_tution_fee?.fees || 'null'}</h1>
            </div>

            <div className='w-full flex flex-col text-gray-100 gap-4  items-center mt-[7rem]'>
              <div className='flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]'>
                <div className='w-full flex justify-center'>
                  <div className='w-full grid grid-cols-1 grid-rows-1 gap-6'>
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      data={allfees}
                      Name={'fees'}
                      label={'Select Fees'}
                      color={'rgb(243, 244, 246)'}
                    />
                  </div>
                </div>

                <div onClick={formik.handleSubmit}>
                  <BasicButton text={'Update'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateFees
