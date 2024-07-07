import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionItem, AccordionButton, AccordionPanel,
  Box, Button, Textarea, useToast, Spinner, Center, Flex, Switch, Text
} from '@chakra-ui/react';
import { getAllReports, answerReport } from '../../services/reportService';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [includeClosed, setIncludeClosed] = useState(true);
  const toast = useToast();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getAllReports(includeClosed);
      const sortedReports = data.reportModel.sort((a, b) => {
        if (a.status === 'PENDING_ANSWER' && b.status !== 'PENDING_ANSWER') {
          return -1;
        } else if (a.status !== 'PENDING_ANSWER' && b.status === 'PENDING_ANSWER') {
          return 1;
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
      setReports(sortedReports);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [includeClosed]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = async (reportId) => {
    try {
      await answerReport({ reportId, reason: answer });
      toast({
        title: 'Report Closed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const updatedReports = reports.map((report) =>
        report.reportId === reportId ? { ...report, status: 'CLOSED', reason: answer } : report
      );
      setReports(updatedReports);
      setSelectedReportId(null);
      setAnswer('');
    } catch (error) {
      console.error('Error answering report:', error);
      toast({
        title: 'Error Closing Report',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleIncludeClosedChange = () => {
    setIncludeClosed(!includeClosed);
  };

  if (loading) {
    return (
      <Center minHeight="80vh">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minHeight="80vh">
        <Box color="red.500">{error.message}</Box>
      </Center>
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box bg="gray.100" p={4} borderRadius="md" w="100%" display="flex" alignItems="center">
          <Box flex="1" fontWeight="bold" color="black">Reporter Email</Box>
          <Box flex="1" fontWeight="bold" color="black">Subject</Box>
          <Box flex="1" fontWeight="bold" color="black">Created At</Box>
          <Box flex="1" fontWeight="bold" color="black">Status</Box>
          <Box width="40px"></Box>
        </Box>
        <Flex alignItems="center">
          <Text mr={2} color="black">Include Closed</Text>
          <Switch colorScheme='purple' isChecked={includeClosed} onChange={handleIncludeClosedChange} />
        </Flex>
      </Flex>
      <Accordion allowToggle>
        {reports.map((report) => (
          <AccordionItem
            key={report.reportId}
            bg="white"
            borderRadius="md"
            mb={4}
          >
            <AccordionButton onClick={() => setSelectedReportId(report.reportId)}>
              <Box flex="1" textAlign="left" fontSize="lg" color="black">
                <Flex alignItems="center">
                  <Box flex="1">{report.reporterEmail}</Box>
                  <Box flex="1">{report.subject}</Box>
                  <Box flex="1">{new Date(report.createdAt).toLocaleString()}</Box>
                  <Box flex="1" display="flex" alignItems="center">
                    {report.status}
                    {report.status === 'PENDING_ANSWER' && (
                      <Box
                        ml={2}
                        width="8px"
                        height="8px"
                        borderRadius="50%"
                        bg="purple.500"
                      />
                    )}
                  </Box>
                  <ChevronDownIcon />
                </Flex>
              </Box>
            </AccordionButton>
            <AccordionPanel pb={4} color="black">
              <Box mb={4}>
                <strong>Description:</strong> {report.description}
              </Box>
              {report.status === 'PENDING_ANSWER' && selectedReportId === report.reportId && (
                <>
                  <Textarea
                    placeholder="Enter reason to close the report"
                    value={answer}
                    onChange={handleAnswerChange}
                    mb={4}
                    color="black"
                  />
                  <Button
                    colorScheme="purple"
                    onClick={() => handleAnswerSubmit(report.reportId)}
                  >
                    Close Report
                  </Button>
                </>
              )}
              {report.status === 'CLOSED' && (
                <Box mt={4}>
                  <strong>Reason for Closure:</strong> {report.reason}
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default ReportsList;
