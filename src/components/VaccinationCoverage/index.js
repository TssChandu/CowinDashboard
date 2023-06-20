import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7daysVaccination} = props
  console.log(last7daysVaccination)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vac-cov-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer height="80%" width="100%">
        <BarChart
          data={last7daysVaccination}
          width={500}
          height={300}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            className="vac-date"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            className="vac-data"
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="20%"
            className="bar"
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            className="bar"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
