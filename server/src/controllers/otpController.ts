import { MongoClient } from 'mongodb';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface SendOTPPayload {
  email: string;
  otpCode: string;
}

export default function (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) {
  const sendOTP = async (payload: SendOTPPayload): Promise<void> => {
    const { email, otpCode } = payload;

    let client;

    try {
      client = await MongoClient.connect(process.env.OTP_DATABASE);
    } catch (err) {
      console.error(err);
      throw new Error('Could not connect to database 💥');
    }

    const db = client.db();

    try {
      const existedOTP = await db
        .collection('otp')
        .findOne({ email, otp: otpCode });
      if (existedOTP == null) {
        socket.emit('send_otp:error', {
          status: 'fail',
          message: 'Wrong OTP code!'
        });
        return;
      }
      if (existedOTP != null && existedOTP.expiredAt < new Date()) {
        socket.emit('send_otp:error', {
          status: 'fail',
          message: 'Expired OTP code!'
        });
        return;
      }
      socket.emit('send_otp:success');
    } catch (err) {
      client.close();
      throw new Error('Something went wrong 💥');
    }

    return;
  };

  socket.on('send_otp', sendOTP);
}
