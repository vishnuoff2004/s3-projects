import React from 'react'
import Nav from "../../components/nav";

const Dashboard = () => {
  return (
    <div>
      <Nav/>
      
          <div>

            <div className="d-flex bg-red my-4 ms-2">
                <h2 className="text-center text-2xl font-bold p-2">my - dashboard</h2>
            </div>

              <div className="container">
                <div className="row">

                  <div className="col-lg-2 col-sm-10 col-md-2 n ">
                    <h6  >TOT No. of bookings</h6>
                    <h1>0</h1>
                  </div>


                  <div className="col-lg-5 col-sm-10 col-md-5 px-3 tab-con" style={{"border":"1px solid black",}}>
                    <div className='d-flex'>
                      <h6 className='bg-danger text-light p-2 my-3'>upcoming services</h6>
                    </div>

                    <table className="w-100">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>name</th>
                          <th>date</th>
                          <th>time</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>



                  <div className="col-lg-5 col-sm-10 col-md-5" style={{"border":"1px solid black"}}>
                    <div className='d-flex'>
                      <h6 className='bg-success text-light p-2 my-3'>completed services</h6>
                    </div>

                    <table className="w-100">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>name</th>
                          <th>date</th>
                          <th>time</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                </div>
              </div>
          </div>
      </div>
  )
}

export default Dashboard