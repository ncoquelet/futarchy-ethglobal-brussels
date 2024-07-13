"use client";

import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, HStack } from "@chakra-ui/react";

export default function ProposalForm() {

  function submit(formData: any) {
    console.log(formData)
    console.log('description: ', formData.get('description'))
    console.log('goalValue: ', formData.get('goalValue'))
    console.log('votingDeadline: ', formData.get('votingDeadline'))
    console.log('goalMaturity: ', formData.get('goalMaturity'))
  }


  return (
    <form action={submit}>
      <Box maxW="600px" mx="auto" p={4}>
        <h2 style={{marginBottom: '2rem' }}>Make a goal</h2>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category">
              <option value="ecologic">Ecologic</option>
              <option value="politic">Politic</option>
              <option value="economic">Economic</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="description" placeholder="Reduce my city's CO2 emissions by 10% in 1 year." />
          </FormControl>

          <FormControl>
            <FormLabel>Goal value</FormLabel>
            <Input name="goalValue" type="goalValue"/>
          </FormControl>

          <FormControl>
            <FormLabel>Trading period</FormLabel>
            <Input name="votingDeadline" type="number"/>
          </FormControl>

          <FormControl>
            <FormLabel>Testing period</FormLabel>
            <Input name="goalMaturity" type="number"/>
          </FormControl>

          <FormControl>
            <FormLabel>Overview</FormLabel>
            <Textarea placeholder="This proposal aims to explore the potential environmental benefits of expanding the city's bike lane network by 20%..." />
          </FormControl>

          {/* <FormControl>
            <FormLabel>Motivation, Goal</FormLabel>
            <Textarea placeholder="The primary motivation for this proposal is to address the growing concern over urban air pollution and climate change..." />
          </FormControl> */}

          {/* <FormControl>
            <FormLabel>Details</FormLabel>
            <Textarea placeholder="To achieve the proposed CO2 emission reduction, the following steps will be undertaken:..." />
          </FormControl> */}

          <FormControl>
            <FormLabel>Rules</FormLabel>
            <Textarea placeholder="If my city's CO2 emissions reduce by <=1%, voters on Yes win. If my city's CO2 emissions reduce by >1%, voters on No win." />
          </FormControl>

          <FormControl>
            <FormLabel>External link (Optional)</FormLabel>
            <Input placeholder="www.bougezvousauvelo.fr" />
          </FormControl>

          <HStack justify="space-between">
            <Button colorScheme="blue" variant="outline">Precedent</Button>
            <Button type="submit" colorScheme="blue">Next</Button>
          </HStack>
        </VStack>
      </Box>
    </form>
  );
}