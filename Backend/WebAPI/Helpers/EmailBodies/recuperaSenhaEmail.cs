namespace WebAPI.Helpers.EmailBodies
{
    public class recuperaSenhaEmail
    {
        public static string EmailStringBody(int userid, string token)
        {

            return $@"
            <html>
                <head>
                    <style>
                        .button-container {{
                            text-align: center;
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
                    </style>
                </head>
                <body>
                    <h2>Recuperação de Senha</h2>
                    <p>Clique no botão abaixo para trocar a sua senha. Este link expira em 3 horas.</p>
                    <div class='button-container'>
                        <a class='button' href='https://areainsted.vercel.app/minhaconta/trocasenha?userid={userid}&token={token}'>Trocar Senha</a>
                    </div>
                </body>
            </html>
            ";
        }
    }
}
