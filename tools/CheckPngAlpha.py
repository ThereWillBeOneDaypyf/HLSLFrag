
from PIL import Image

def is_png_no_transparent(path):
    # Open file
    im = Image.open(path)
    # get image scale
    width, height = im.size
    print('Original image size: %sx%s' % (width, height))
    # for
    for w in range(0, width):
        for h in range(0, height):
            pixel = im.getpixel((w, h))
            if (isinstance(pixel ,int )):
                print ("It's PNG8")
                return False
            if (len(pixel) > 3):
                if (pixel[3] != 255):
                   print ("Has transparent")
                   return False
            else:
                print ("It's not png ")
                return False

    print ("No transparent ")
    return True

is_png_no_transparent("partner_picture_53007.png")