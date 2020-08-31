const handleOnRowSelected = function handleOnRowSelected () {
    handleOnRowSelected =(countyToUpdate) =>{
        const counties =[...this.state.counties];
        const countyIndex = counties.findIndex(
            (c) => c.name === countyToUpdate.name,
            (c) => c.female === countyToUpdate.female,
            (c) => c.male === countyToUpdate.male,
            (c) => c.twenty=== countyToUpdate.twenty,
            (c) => c.thirty === countyToUpdate.thirty,
            (c) => c.fourty === countyToUpdate.fourty,
            (c) => c.fifty1 === countyToUpdate.fifty1,
            (c) => c.fifty2 === countyToUpdate.fifty2,
            (c) => c.sixty1 === countyToUpdate.sixty1,
            (c) => c.sixty2 === countyToUpdate.sixty2,
            (c) => c.seventy1 === countyToUpdate.seventy1,
            (c) => c.seventy2 === countyToUpdate.seventy2,
            (c) => c.eighty1 === countyToUpdate.eighty1,
            (c) => c.eighty2 === countyToUpdate.eighty2,
        );
        const county = {
            name: countyToUpdate.name,
            total: countyToUpdate.total,
            service: countyToUpdate.service,
            female: countyToUpdate.female,
            male: countyToUpdate.male,
            twenty: countyToUpdate.twenty,
            thirty: countyToUpdate.thirty,
            fourty: countyToUpdate.fourty,
            fifty1: countyToUpdate.fifty1,
            fifty2: countyToUpdate.fifty2,
            sixty1: countyToUpdate.sixty1,
            sixty2: countyToUpdate.sixty2,
            seventy1:countyToUpdate.seventy1,
            seventy2: countyToUpdate.seventy2,
            eighty1: countyToUpdate.eighty1,
            eighty2:countyToUpdate.eighty2,

            //get the oppisit value
            selected: !countyToUpdate.selected,
        };
       
        
        //replace the selected county inside the countyindex
        counties[countyIndex] = county;
        this.setState({counties, selectedCounties: counties.filter((c) =>c.selected),
        });
    };
}

export default handleOnRowSelected;