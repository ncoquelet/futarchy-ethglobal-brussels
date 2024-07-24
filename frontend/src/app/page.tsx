"use client";
import Link from "next/link";
import Image from "next/image";
import GoalCard from "../components/GoalCard";
import React from "react";

// Chakra UI
import {Box, Button, Skeleton, Stack} from "@chakra-ui/react";
import {useFutarchy} from "@/context/FutarchyContext";

export default function Home() {
    const {goals} = useFutarchy();
    //get the goals from address

    const cardList = goals.map((goal) => (
        <div className="card-container" key={goal.addr}>
            <Link
                href={{
                    pathname: "/goal-overview",
                    query: {goalAddress: goal.addr}, // the data
                }}
            >
                <GoalCard
                    goal={goal}
                    votingDeadline={goal.votingDeadline}
                    proposals={goal.proposals}
                />
            </Link>
        </div>
    ));

    return (
        <main className="p-4 font-satoshi">
            <div
                className="hero"
                style={{display: "flex", justifyContent: "space-between"}}
            >
                <div style={{flex: "0 0 30%"}}>
                    <div>
                        <div
                            className="hero-text font-satoshi text-4xl font-bold mb-4"
                            style={{marginTop: "1rem"}}
                        >
                            Chose a goal and reach it with community
                        </div>
                    </div>
                    <div>
                        <Link href="/goal-create">
                            <Button bg="white" color="customBlue.100" size="md">
                                New goal
                            </Button>
                        </Link>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flex: "0 0 50%",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                        }}
                    >
                        <Image
                            src="/sunset.png"
                            width={500}
                            height={500}
                            alt="Picture of a sunset"
                        />
                    </div>
                </div>
            </div>
            <div className="section" style={{marginBottom: "2rem"}}>
                <h1 style={{marginTop: "1rem"}}>New goals</h1>
                <div className="card-list">
                    {goals.length > 0 ? (
                        cardList
                    ) : (
                        <div style={{display: 'flex'}}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p="6"
                                bg="white"
                                boxShadow="md"
                                style={{minWidth: "20rem"}}
                                className="card-container"
                            >

                                <Stack spacing={3}>
                                    <Skeleton height='20px'/>
                                    <Skeleton height='20px'/>
                                    <Skeleton height='20px'/>
                                </Stack>
                            </Box>
                            <Box
                                className="card-container"
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p="6"
                                bg="white"
                                boxShadow="md"
                                style={{minWidth: "20rem"}}
                            >

                                <Stack spacing={3}>
                                    <Skeleton height='20px'/>
                                    <Skeleton height='20px'/>
                                    <Skeleton height='20px'/>
                                </Stack>
                            </Box>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
