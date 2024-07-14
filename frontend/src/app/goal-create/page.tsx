"use client";

import { useFutarchy } from "@/context/FutarchyContext";
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, HStack } from "@chakra-ui/react";

export default function ProposalForm() {

  const {createGoal} = useFutarchy();

  function submit(formData: any) {

    const description =  formData.get('description');
    const goalValue = formData.get('goalValue');
    const votingDeadline = formData.get('votingDeadline');
    const goalMaturity = formData.get('goalMaturity');

    createGoal(description, goalValue, votingDeadline, goalMaturity);
  }

  return (
    <form action={submit}>
      <Box maxW="600px" mx="auto" p={4} style={{marginTop: '3rem', marginBottom: '12rem'}}>
        <h2 style={{marginBottom: '4rem' }}>Make a goal</h2>
        <VStack spacing={4} align="stretch">
          {/* <FormControl>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category">
              <option value="ecologic">Ecologic</option>
              <option value="politic">Politic</option>
              <option value="economic">Economic</option>
            </Select>
          </FormControl> */}

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Title</FormLabel>
            <Input name="title" placeholder="Reduce my city's CO2 emissions by 10% in 1 year." />
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Overview</FormLabel>
            <Textarea name="overview" placeholder="This proposal aims to explore the potential environmental benefits of expanding the city's bike lane network by 20%..." />
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Goal value</FormLabel>
            <Input name="goalValue" type="goalValue"/>
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Trading phase duration</FormLabel>
            <Input name="votingDeadline" type="number"/>
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Testing phase duration</FormLabel>
            <Input name="goalMaturity" type="number"/>
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>Rules</FormLabel>
            <Textarea name="rules" placeholder="If my city's CO2 emissions reduce by <=1%, voters on Yes win. If my city's CO2 emissions reduce by >1%, voters on No win." />
          </FormControl>

          <FormControl style={{marginTop:'1rem'}}>
            <FormLabel>External link (Optional)</FormLabel>
            <Input name="externalLink" placeholder="www.bougezvousauvelo.fr" />
          </FormControl>

          <HStack justify="space-between" style={{marginTop:'3rem'}}>
            <Button variant='outline' color='customBlue.100' colorScheme="blue" borderColor='customBlue.100' size='md'>Precedent</Button>
            <Button bg='customBlue.100' color='white' borderColor='customBlue.100' size='md' type="submit">Next</Button>
          </HStack>
        </VStack>
      </Box>
    </form>
  );
}