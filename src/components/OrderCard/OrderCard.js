import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function MediaCard(props) {

    const item = props.item ;

    const renderItems = item.order_items.map(i => {

        return(
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image= {i.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {i.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price : {i.selling_price} Rs <br/>
                Ordered On : {moment(item.order_date).format("MMM Do YY") }   <br/>
                Payment Status : {item.status}  <br/>


               
              </Typography>
            </CardContent>
            <CardActions>
              <Link to = {`/productPage/${i.productId}`}>
              <Button size="small">View  More about product </Button>
              </Link>
            </CardActions>
          </Card>
        )
    })
  return (
   <>
   {renderItems}
  </>
    
  );
}