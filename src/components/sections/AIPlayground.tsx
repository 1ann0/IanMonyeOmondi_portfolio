import React, { useState } from 'react';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { ImageIcon, Wand2, Loader2, Upload } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function AIPlayground() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;

    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      // Extract base64 data and mime type
      const [header, base64Data] = image.split(',');
      const mimeType = header.split(':')[1].split(';')[0];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const resultBase64 = part.inlineData.data;
            setResultImage(`data:image/png;base64,${resultBase64}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("No image was generated. Please try a different prompt.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-playground" className="py-32 px-6 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-text-primary">
              AI Playground
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Experience the power of Gemini 2.5 Flash Image. Upload an image and use text prompts to edit it instantly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <Card className="h-full bg-bg-elevated border-border-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                  Source Image
                </CardTitle>
                <CardDescription>Upload an image to start editing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-2xl border-2 border-dashed border-border-subtle bg-bg-deepest flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  {image ? (
                    <>
                      <img src={image} alt="Source" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-bg-deepest/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <label className="cursor-pointer bg-bg-elevated text-text-primary px-4 py-2 rounded-full border border-border-subtle hover:bg-bg-hover transition-colors flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Change Image
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-blue-400 transition-colors">
                      <Upload className="w-10 h-10 mb-4 opacity-50" />
                      <span className="font-medium">Click to upload</span>
                      <span className="text-sm opacity-70 mt-1">PNG, JPG up to 5MB</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <Card className="h-full bg-bg-elevated border-border-subtle flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  AI Editor
                </CardTitle>
                <CardDescription>Describe how you want to edit the image</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Add a retro filter, remove the background..."
                    className="flex-1 bg-bg-deepest border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    disabled={!image || isGenerating}
                  />
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!image || !prompt || isGenerating}
                    className="px-6 rounded-xl"
                  >
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
                  </Button>
                </div>

                <div className="flex-1 aspect-square rounded-2xl border border-border-subtle bg-bg-deepest flex flex-col items-center justify-center relative overflow-hidden">
                  {isGenerating ? (
                    <div className="flex flex-col items-center text-blue-400">
                      <Loader2 className="w-10 h-10 animate-spin mb-4" />
                      <span className="font-mono text-sm animate-pulse">Processing image...</span>
                    </div>
                  ) : resultImage ? (
                    <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
                  ) : error ? (
                    <div className="text-red-400 text-center p-6 bg-red-400/10 rounded-xl border border-red-400/20">
                      <p className="font-medium">{error}</p>
                    </div>
                  ) : (
                    <div className="text-text-tertiary text-center p-6">
                      <Wand2 className="w-10 h-10 mx-auto mb-4 opacity-20" />
                      <p>Your edited image will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
