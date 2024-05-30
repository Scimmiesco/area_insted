using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Mail;
using WebAPI.Models;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _configuration["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Área do aluno - INSTED", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject = emailModel.Subject;

            var body = new TextPart("html")
            {
                Text = emailModel.Content
            };
            emailMessage.Body = body;

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.Connect("smtp.gmail.com", 465, true);
                    client.Authenticate("imscimmiesco@gmail.com", "ebcx lbse qvrl cyuf");
                    client.Send(emailMessage);
                 }
                catch (Exception ex)
                {
                    // Lide com a exceção de envio de e-mail aqui
                    throw ex;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
