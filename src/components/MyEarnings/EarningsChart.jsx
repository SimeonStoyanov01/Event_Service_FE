
import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Center, Spinner, Heading, Stack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getOrganizationEarnings } from '../../services/organizationService';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const EarningsChart = ({ organizationId }) => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEstimated, setShowEstimated] = useState(true);
  const [showActual, setShowActual] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2024, 0, 1), 
      endDate: new Date(2030, 0, 1),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getOrganizationEarnings(organizationId);
        setEarnings(response.organizationEarningsPerEvent);
      } catch (error) {
        console.error('Error fetching organization earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [organizationId]);

  const filterEarningsByDate = (earnings, startDate, endDate) => {
    return earnings.filter(({ eventModel }) => {
      const eventDate = new Date(eventModel.eventDateTime);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const filteredEarnings = filterEarningsByDate(earnings, dateRange[0].startDate, dateRange[0].endDate);

  if (loading) {
    return (
      <Center>
        <Spinner size="md" />
      </Center>
    );
  }

  const aggregateEarningsByMonth = (earnings) => {
    const monthlyData = {};

    earnings.forEach(({ eventModel, estimatedEarnings, actualEarnings }) => {
      const eventDate = new Date(eventModel.eventDateTime);
      const month = eventDate.toLocaleString('default', { year: 'numeric', month: 'long' });

      if (!monthlyData[month]) {
        monthlyData[month] = { estimated: 0, actual: 0 };
      }

      monthlyData[month].estimated += estimatedEarnings;
      monthlyData[month].actual += actualEarnings;
    });

    return monthlyData;
  };

  const monthlyData = aggregateEarningsByMonth(filteredEarnings);

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Estimated Earnings',
        data: Object.values(monthlyData).map(data => data.estimated),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        hidden: !showEstimated,
      },
      {
        label: 'Actual Earnings',
        data: Object.values(monthlyData).map(data => data.actual),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        hidden: !showActual,
      },
    ],
  };

  const barChartData = {
    labels: filteredEarnings.filter(data => data.estimatedEarnings).map(({ eventModel }) => eventModel.eventName),
    datasets: [
      {
        label: 'Estimated Earnings',
        data: filteredEarnings.filter(data => data.estimatedEarnings).map(data => data.estimatedEarnings),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        hidden: !showEstimated,
      },
      {
        label: 'Actual Earnings',
        data: filteredEarnings.filter(data => data.estimatedEarnings).map(data => data.actualEarnings),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        hidden: !showActual,
      },
    ],
  };

  return (
    <Box>
      <Heading as="h2" size="md" mb={4} color="black">Earnings Overview</Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" color="black">
              Select Date Range
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box mb={4}>
              <DateRangePicker
                ranges={dateRange}
                onChange={item => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                rangeColors={['#6B46C1']}
                color="black"
              />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Checkbox isChecked={showEstimated} onChange={() => setShowEstimated(!showEstimated)} color="black" colorScheme="purple" mr={4}>
          Show Estimated
        </Checkbox>
        <Checkbox isChecked={showActual} onChange={() => setShowActual(!showActual)} color="black" colorScheme="purple">
          Show Actual
        </Checkbox>
      </Box>
      <Stack spacing={8}>
        <Box>
          <Heading as="h3" size="md" mb={4} color="black">Monthly Earnings</Heading>
          <Line data={chartData} options={{ scales: { x: { reverse: true } } }} />
        </Box>
        <Box>
          <Heading as="h3" size="md" mb={4} color="black">Earnings Per Event</Heading>
          <Bar data={barChartData} />
        </Box>
      </Stack>
    </Box>
  );
};

export default EarningsChart;
