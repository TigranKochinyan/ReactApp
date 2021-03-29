import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, Button, FormControl, DropdownButton, Dropdown, Accordion, Card } from 'react-bootstrap';
import { cutText, textTransform, formatingDate } from './../../../helpers/utils';
import DatePicker from "react-datepicker";
import { getTasks } from './../../../store/actions';


import "react-datepicker/dist/react-datepicker.css";
import './search.scss';


const statusOptions = [ '', 'active', 'done'];
const sortOptions = [
    '',
    'a-z',
    'z-a',
    'creation_date_oldest',
    'creation_date_newest',
    'completion_date_newest',
    'completion_date_oldest'
];
const dateOptions = [
    'create_lte', 
    'create_gte',
    'complete_lte',
    'complete_gte'
];

const Search = (props) => {

    const [status, setStatus] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const handleChangeDate = (value, name)=>{
        setDates({
            ...dates,
            [name]: value
        });
    };
    const handleSubmit = ()=>{
        const params = {};

        search && (params.search = search);
        sort && (params.sort = sort);
        status && (params.status = status);


       for(let key in dates){
           const value = dates[key];
           if(value){
            const date = formatingDate(value.toISOString());
            params[key] = date;
           }

       }
       props.getTasks(params);
    };

    const dropdownsArr = dateOptions.map((option, index)=>(
            <div key={index}>
            <span>{textTransform(option)} </span>
            <DatePicker 
            
            selected={dates[option]}
            onChange={(value)=> handleChangeDate(value, option)}
            />
            </div>
        )
    );
    const { theme } = props;
    return (
        <div className={`search mb-3 search-${theme}`}>
            <InputGroup className={`search-${theme}`}>
                <FormControl
                    placeholder="Search"
                    onChange={(event) => setSearch(event.target.value)}
                />

                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={status ? textTransform(status) : 'Status'}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={status === option}
                                onClick={() => setStatus(option)}
                            >
                                {option === '' ? 'All' : textTransform(option)}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={sort ? textTransform(cutText(sort, 6)) : 'Sort'}
                    id="input-group-dropdown-1"
                >
                    {
                        sortOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={sort === option}
                                onClick={() => setSort(option)}
                            >
                                {option === '' ? 'All' : textTransform(option)}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <InputGroup.Append>

                    <Button 
                    variant="outline-primary"
                    onClick={handleSubmit}
                    >
                    Search</Button>
                </InputGroup.Append>

            </InputGroup>
            <Accordion className="search-accordion" defaultActiveKey="">
                <Card className="search-accordion-card">
                    <Card.Header>
                    <Accordion.Toggle as={Button} className="text-center" variant="link" eventKey="0">
                        Sort
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className="search-accordion-card-dropdown">
                            {
                                dropdownsArr.slice(0,2)
                            }
                        </div>
                        <div className="search-accordion-card-dropdown">
                            {
                                dropdownsArr.slice(2,dropdownsArr.length)
                            }
                        </div>
                        
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>      
        </div>
    )
};

const mapDispatchToProps = {
    getTasks
};

const mapStateToProps = (store) => {
    return {
        theme: store.theme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);