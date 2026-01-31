<!DOCTYPE html>
<html lang="en">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="{{ asset('favicon_v4.ico') }}">
  @routes
  <meta charset="UTF-8">
  <title>Surya Darmawan</title>
  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.jsx'])
  @inertiaHead
</head>
<body class="bg-gray-900 text-white">
  @inertia
</body>
</html>
