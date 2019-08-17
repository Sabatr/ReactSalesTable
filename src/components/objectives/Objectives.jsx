import React from "react";
import {
    makeStyles,

    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    Link,
} from "@material-ui/core";

import AssignmentIcon from "@material-ui/icons/Assignment";

const EMAIL = "careers@quantiful.co.nz";

const useStyles = makeStyles({
    card: {
        height: "100vh",
        padding:"20px",
    },
    title: {
        fontSize: 50,
        marginBottom: 30,
    },
    assessment: {
        margin: "20px 0px",
    },
    go: {
        margin: "20px 0px",
    },
    deadline: {
        marginTop: 20,
    },
    requirements: {
        fontWeight: "bold",
    },
    description: {
        marginBottom: 10,
    },
});


// objectives page: things that the prospective candidate needs to do

const Objectives = () => {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title}>
                    Intern Task 2019
                </Typography>
                <Typography className={classes.description}>
                    You have been given a set of sales transactions that need to be displayed to the user.
                    <strong> Create a table (or list) that shows all the sales transactions made by each store.
                    The table should be dynamic and can ideally be filtered by certain fields (such as by country and store). </strong>
                </Typography>

                <Typography>
                   It would be ideal to:
                </Typography>

                <List className={classes.requirements}>
                    <ListItem> see only sales values that are not returned </ListItem>
                    <ListItem> view sales by country </ListItem>
                    <ListItem> view the sales in different currencies</ListItem>
                    <ListItem> see the sales by stores</ListItem>
                    <ListItem> write a brief summary of your findings and how you approached the task</ListItem>
                </List>

                <Typography>
                    You are open to using any JavaScript packages and libraries.
                </Typography>

                <Typography>
                    Array methods are preferred (such as `map`, `reduce` over for loops).
                </Typography>

                <Typography className={classes.assessment}>
                    You will be assessed on how well you structure and write your code, your summary and how you
                    choose to display this information. Extra points for creativity and design!
                </Typography>

                <Typography className={classes.go}>
                    Click on <AssignmentIcon /> to get started and add your work to the `Task.jsx` file.
                    To get the data, it would be ideal to fetch it from the URL provided in the file.
                    If you struggle with this, a copy of the data can be found in the `data` folder.
                </Typography>

                <Typography>
                    Once you have finished, create a GitHub account and upload the project as a public repository.
                    Email us at <Link href={`mailto: ${EMAIL}`}>{EMAIL}</Link> with the link.
                </Typography>

                <Typography className={classes.deadline}>
                    You have until <b>Tuesday 20th August 2019 12pm</b> - Good luck and happy coding! :)
                </Typography>

            </CardContent>
        </Card>
    )
};

export default Objectives;
