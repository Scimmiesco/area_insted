namespace WebAPI.Helpers.EmailBodies
{
    public class NovoAcessoEmail
    {
        public static string EmailStringBody(string userNome, string novoIP, string cidade, string horarioAcesso)
        {
            return $@"
            <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 10px 20px;
                            font-size: 16px;
                            background-color: #007BFF;
                            color: #fff;
                            border: none;
                            border-radius: 30px;
                            cursor: pointer;
                            text-decoration: none;
                        }}
                        .button:hover {{
                            background-color: #0056b3;
                        }}
                        h2 {{
                            color: #333;
                        }}
                        p {{
                            color: #666;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Atenção: Novo Acesso à Sua Conta</h2>
                        <p>Olá, {userNome}</p>
                        <p>Estamos entrando em contato para informar que uma nova atividade foi registrada na sua conta.</p>
                        <p>O novo acesso foi identificado a partir do seguinte endereço IP: {novoIP}.</p>
                        <p>A atividade foi registrada na cidade de {cidade}.</p>
                        <p>O acesso ocorreu em {horarioAcesso}.</p>
                        <p>Caso este acesso não tenha sido realizado por você, recomendamos que tome ações imediatas para proteger sua conta. Altere sua senha e entre em contato conosco se notar alguma atividade suspeita.</p>
                        <p>Se foi você quem acessou sua conta a partir deste novo IP, ignore este e-mail.</p>
                        <p>Estamos comprometidos em garantir a segurança e privacidade dos nossos usuários.</p>
                        <p>Atenciosamente,<br/>Sua Equipe de Suporte</p>
                    </div>
                </body>
            </html>
            ";
        }
    }
}
