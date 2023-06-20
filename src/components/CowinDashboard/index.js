import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, dashboardDetails: {}}

  componentDidMount() {
    this.getCowinDashboardDetails()
  }

  getCowinDashboardDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7daysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        dashboardDetails: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {dashboardDetails} = this.state
    const {
      last7daysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = dashboardDetails
    console.log(last7daysVaccination)
    return (
      <>
        <VaccinationCoverage last7daysVaccination={last7daysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-description">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderDashboard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-bg-container">
        <div className="cowin-icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="cowin-heading">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderDashboard()}
      </div>
    )
  }
}

export default CowinDashboard
