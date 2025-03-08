// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/utils/emailService';
import { logContactSubmission } from '@/utils/contactLogger';

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate the form data
    if (!data.email || !data.name || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Try to send the email
    try {
      await sendContactEmail(data);
      console.log('Email sent successfully for submission from', data.name);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue execution even if email fails
    }
    
    // Also store submission in local file as backup
    try {
      logContactSubmission(data);
    } catch (logError) {
      console.error('Failed to log submission:', logError);
      // Don't fail the request if logging fails
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
}