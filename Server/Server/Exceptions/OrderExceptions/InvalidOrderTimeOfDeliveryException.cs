﻿using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderTimeOfDeliveryException : BadRequestException
    {
        public InvalidOrderTimeOfDeliveryException(string timeOfDelivery) : base($"Order time of delivery is not a valid time and date in the future ({timeOfDelivery})")
        {

        }
    }
}
